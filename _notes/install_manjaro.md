---
title: "Configure Dual-Boot Linux (Manjaro) to the Laptop (Blade 15 2022) for Everything"
collection: notes
permalink: /notes/Install-and-Configure-Linux-Laptop
tags:
  - Linux
  - Manjaro
date: "2022-05-27"
tool: "/images/nothing.png"
--- 
It is crazy to configure Linux to a latest released laptop, especially for a newbie to the hardware and system (like me), so I would like to share my major configurations journal here for others (and just in case I need to rebuild everything if it is crashed in the future...)

> Charles Zhang

- [Machine Info](#machine-info)
- [Basic Installation and Configuration](#basic-installation-and-configuration)
- [Python Environment (& MuJoCo)](#python-environment--mujoco)
- [SSH](#ssh)
- [Personal Configuration](#personal-configuration)


### Machine Info 
- System
  - Kernel: 5.17.6-1-MANJARO, arch: x86_64 
  - Desktop: Xfce v: 4.16.0,dou   	 dm: LightDM
  - Distro: Manjaro Linux,     	 base: Arch Linux
- Machine
  - Type: laptop,      System: Razer,    Product: Blade 15 (2022) - RZ09-0421
- CPU
  - 12th Intel Core i7-12800H, Arch: Alder Lake
  - Cores: 14,   Threads: 20, RAN: 32 GB
- GPU
  - Intel Alder Lake-P Integrated Graphics     
    - Driver: i915
  - NVIDIA GeForce RTX 3080 Ti Laptop GPU
    - Driver: nvidia510
    - VRAM: 16 GB

### Basic Installation and Configuration  
- Download Manjaro iso image: [here](https://manjaro.org/download/)
  - linux kernel version: 5.15
    - Not support WiFi driver => need to update to 5.17
- Flash iso to USB by Etcher: [here](https://www.balena.io/etcher/) 
- `F12` boot with USB
- Wired connection (e.g. by phone hotspot)
- Install Manjaro and reboot
- Update to kernel version 5.17 (for `iwlwifi` driver for wifi):
  - ```bash
    sudo pacman -Sy	# synchronizing community database
    sudo pacman -R linux515-nvidia	# remove conflict dependencies 
    sudo mhwd-kernel -i linux517  # install 5.17
    ```
    - Or install from Manjaro Setting Manager/Kernel
  - Remove kennel 5.15
  - Reboot
- Extended monitor is not working:
  - Append in `/etc/default/grub`
    - ```bash
      GRUB_CMDLINE_LINUX_DEFAULT=“pci=realloc”
      ```
- Nvidia sanity check
  - Ideal output of `pacman -Qs linux517-`:
  - ```bash
    local/linux517-headers 5.17.6-1
      Header files and scripts for building modules for Linux517 kernel
    local/linux517-nvidia 510.68.02-4 (linux517-extramodules)
      NVIDIA drivers for linux.
    ```
    - Otherwise:
      - ```bash
        sudo pacman -S linux517-headers linux517-nvidia
        ```
    - Reboot
- Stop random sleeping (logout) issue
  - Edit in `/etc/default/grub`:
    - Append command inside the quotes of `GRUB_CMDLINE_LINUX_DEFAULT=’ … ’ `:
      - ```bash
        button.lid_init_state=open
        ```
  - To update:
    - ```bash
      sudo update-grub`
      ``` 
- RAM swap
  - `pamac install systemd-swap		# install`
  - Edit `/etc/systemd/swap.conf`
    - ```bash
      `zswap_enabled=1`
      `swapfc_enabled=1`
      ```
  - ```bash
    sudo systemctl enable --now systemd-swap.service	# activate
    ```
  - Optional check status 
    - ```bash
      sudo systemctl status systemd-swap.service
      ```
- Common WiFi Security setup:
  - xfinity
    - Security: WPA & WPA2 Enterprise
    - Authentication: Tunneled TLS
    - No CA certificate is required
    - Inner authentication: PAP
    - Username & Password
  - eduroam (and college’s WiFi)
    - Security: WPA & WPA2 Enterprise
    - Authentication: Protected EAL (PEAP)
    - Domain: xxx.edu
    - No CA certificate is required
    - PEAP version: Automatic
    - Inner authentication: MMSCHAPv2
    - Username & password
- Troubleshooting
  - Buzzing sound when output sounds
    - Uninstall `wireplumber` and install `pipewire-media-session`
    - Otherwise: discussion [here](https://forum.manjaro.org/t/buzzing-sound-probably-after-updates/111989/36)
- More MacOS / Windows-like extra configurations, e.g. touchpad gestures, mission control, Windows IR Face ID, and so forth, can be found in the section [Personal Configuration](#personal-configuration).
- Known unresolvable issues (waiting for updates):
  - No microphone (input audio)
  - Reversed sound output


### Python Environment (& MuJoCo)
- Miniconda
  - ```bash
    wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
    bash Miniconda3-latest-Linux-x86_64.sh
    source .bashrc
    ```
- MuJoCo
  - ```bash
    wget https://mujoco.org/download/mujoco210-linux-x86_64.tar.gz 
    mkdir ~/.mujoco
    tar xf mujoco210-linux-x86_64.tar.gz -C ~/.mujoco
    ```
  - Extra work to build from scratch for Manjaro:
    - ```bash
      git clone https://github.com/openai/mujoco-py
      cd mujoco-py
      pip install -e . --no-cache     # after activate conda env
      ```
  - Render troubleshooting:
    - Missing path to your environment variable
      - ```bash
        export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$HOME/.mujoco/mujoco210/bin:/usr/lib/nvidia
        ```
        - or add in python file
          - ```python
            os.environ[
              "LD_LIBRARY_PATH"
            ] = f"{os.environ['$LD_LIBRARY_PATH']}:{os.environ['HOME']}/.mujoco/mujoco210/bin:/usr/lib/nvidia" 
            ```
    - GLEW initialization error: Missing GL version
      - ```bash
        export LD_PRELOAD=/usr/lib/libGLEW.so
        ```
    - libGL error: failed to load driver: i965 and swrast issues
      - ```bash
        sudo find / -wholename "*conda*/**/libstdc++.so*"
        conda install libgcc
        # check if conflicts
        sudo find / -wholename "*conda*/**/libstdc++.so*"
        rm ~/miniconda3/envs/<env_name>/lib/libstdc++*
        ``` 	
- PyTorch 
  - ```bash
    conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch
    ```
    - Though cuda is 11.6 for the system
    - Otherwise, error occurs:
      - RuntimeError: CUDA error: no kernel image is available for execution on the device


### SSH
- ```bash
  sudo pacman -S openssh
  sudo systemctl status sshd.service
  sudo systemctl enable sshd.service
  sudo systemctl start sshd.service
  ```
- Generate key
  - e.g. `ssh-keygen -t rsa -b 4096 -C "xxx@xxx.org"`
  - Add to `~/.ssh/config` (or need to `/etc/ssh/ssh_config`) for login username
    - ```bash
      HOST *  
        USER charlesz
      ``` 
  - `ssh-keygen -y` for pub key
- Troubleshooting:
  - …bad permissions…
    - ```bash
      chmod 400 ~/.ssh/id_rsa
      chmod 600 ~/.ssh/config
      ```
- same network ip `ip ad` => `ssh <username>@<ip>`
- With port forwarding
  - `ssh <username>@<WAN ip address> -p <port>`
  - Modify in `/etc/ssh/sshd_config` for ports
  - systemctl restart sshd
    - `ss -tln` to double-check

### Personal Configuration
- *AUR*, *Snap* for extension
- Hot key command for terminal
  - ```bash
    xfce4-terminal
    ```
- Crop screen: *flameshot*
  - Hot key command
    - ```bash
      flameshot gui
      ```
- Record screen: *SimpleScreenRecorder*
- VS code (refined version)
  - Need for symlink
     ```bash
     sudo ln -s /var/lib/snapd/snap/snap
     ```
- MacOS style [ref](https://www.youtube.com/watch?v=oQ8RWtD3MTQ)
  - [Theme](https://www.pling.com/p/1403328)
  - [Icons](https://www.pling.com/p/1405756/)
- Customize "show all application windows" (expose mission control)
  - ```bash
    cp /etc/xdg/skippy-xd.rc ~/.config/skippy-xd/skippy-xd.rc
    ```
  - Edit in ~/.config/skippy-xd/skippy-xd.rc
  - ```bash
    movePointerOnStart = false
    switchDesktopOnActivate = true
    Opacity=255	  # 0-255
    background = scale mid mid /path/to/file
    ```
  - on-start command 
    - ```bash
      skippy-xd --start-daemon
      ```
  - Customized hotkey command `skippy-xd`
- Chinese pinyin: 
  - ```bash
    sudo pacman -S fcitx-im fcitx-configtool fcitx-cloudpinyin fcitx-sunpinyin
    ```
  - Add to `~/.xprofile`
    - ```bash
      export GTK_IM_MODULE=fcitx
      export QT_IM_MODULE=fcitx
      export XMODIFIERS=@im=fcitx
      ```
  - Reboot 
  - Hot key: `Ctrl`+`space`
- Gestures:
  - ```bash
    sudo pacman -S xdotool libinput-gestures
    sudo gpasswd -a <user_name> input #add user in input group
    libinput-gestures-setup desktop 	# set up the application using the DE
    libinput-gestures-setup autostart 	# enable the app to start automatically in the background
    libinput-gestures-setup start 		# start the app immediately in the background
    ```
      - Troubleshooting: if *libinput-gestures failed to start as a desktop application.*
        - ```bash
          sudo gpasswd -a $USER input	# set user to group first
          ```
        - Reboot
  - Add to `~/.config/libinput-gestures.conf`:
    - ```bash
      # Zoom in / Zoom out
      gesture: pinch out xdotool key Ctrl+plus
      gesture: pinch in xdotool key Ctrl+minus
      # TODO smoothing scroll not working
      # gesture: pinch out xdotool key Super_L+equal
      # gesture: pinch in xdotool key Super_L+minus

      # Switch between desktops
      gesture: swipe left 4 xdotool set_desktop --relative 1
      gesture: swipe right 4 xdotool set_desktop --relative -- -1

      # Full screen windows (tasks) switcher (F11 & ESC)
      gesture: swipe up 4 xdotool key 0xffc8
      gesture: swipe down 4 xdotool key 0xff1b

      # Tile windows (hotkey may different)
      gesture: swipe left 3 xdotool key Super_L+Left
      gesture: swipe right 3 xdotool key Super_L+Right
      gesture: swipe up 3 xdotool key Super_L+Up
      gesture: swipe down 3 xdotool key Super_L+Down
      gesture: swipe left_up 3 xdotool key Ctrl+Super_L+Up
      gesture: swipe left_down 3 xdotool key Ctrl+Super_L+Down
      gesture: swipe right_up 3 xdotool key Alt+Super_L+Up
      gesture: swipe right_down 3 xdotool key Alt+Super_L+Down  
      ```
  - Reboot
  - Xdotoll list of key codes: [here](https://gitlab.com/cunidev/gestures/-/wikis/xdotool-list-of-key-codes#:~:text=Shift%20lock-,Meta_L,-0xffe7)
- Github desktop troubleshooting (for UI fans): *Authentication failed:
Error calling StartServiceByName for org.freedesktop.secrets: Failed to execute program org.freedesktop.secrets: No such file or directory*
  - ```bash
    sudo pacman -S gnome-keyring libsecret
    ```  
  - if still not working, try SSH keys
  - if still not working
    - in `.git/config` manually set
      - ```bash
        url=https://username:token@github.repo.git
        ```
- Tmux
  - Enable mouse:
    - Add in `.tmux.conf`:
      - ```bash
        set -g mouse on
        ```
    - ```bash
      tmux kill-server && tmux
      ```
    - After this, selection automatically copied
    - Paste: `Ctrl+b` `]`
  - CheatSheet (prefix `Ctrl+b`)
    - tmux new -s session_name
    - `tmux` equivalent to `tmux new -s 0 # (or 1, 2, 3, …)`
    - `tmux ls`
    - `Ctrl+b` `%` Split current pane horizontally into two panes
    - `Ctrl+b` `"` Split current pane vertically into two panes
    - `Ctrl+d` close current pane
    - `Ctrl+b` `d` detach
    - ```bash
      tmux a -t <session_name>	# attach
      ```
    - `Ctrl+b` `c` Create a new window (with shell)
    - `Ctrl+b` `w` Choose window from a list
    - `Ctrl+b` `0` Switch to window 0 (by number )
    - `Ctrl+b` `,` Rename the current window
- Face ID (Windows near infrared (IR) camera):
  - Install `howdy` (or `yay -S --editmenu howdy`)
  - ```bash
    mpv /dev/video2	  # find IR camera, mostly video2
    ```
  - Edit `/lib/security/howdy/config.ini`
    - ```bash
      certainty = 4.5	# faster recognize
      device_path = /dev/video2	# or whatever for IR
      dark_threshold = 100
      ```
  - Register face
    ```bash
    sudo howdy add
    ```
  - Add `auth sufficient pam_python.so/lib/security/howdy/pam.py` in
    - `/etc/pam.d/sudo` for sudo
    - `system-local-login` and e.t.c. for unlock screen, download apps, e.t.c.
- Open folder from terminal: 
  - ```bash
      xdg-open .  # current dir, or /path/to/folder
    ```
- Logi-tech mouse button configuration GUI
  - *Piper*
- Hot corner
  - *xfce-hotcorner-plugin*
 






<script src="https://utteranc.es/client.js"
        repo="zcczhang/zcczhang.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>


