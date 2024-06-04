#!/bin/bash

# Function to log script start
log_start() {
    echo "$(date +"%Y-%m-%d %H:%M:%S") - $1 started"
}

log_end() {
    echo "$(date +"%Y-%m-%d %H:%M:%S") - $1 ended"
}

kill_child_processes() {
    echo "Terminating all child processes..."
    pkill -P $$  # Kill all child processes of the current script
}

trap 'kill_child_processes' SIGINT

log_start "[+] Main Script"
python3 main.py &

log_start "[+] LiveStream Script"
python3 live_stream.py &

log_start "[+] MotionT Script"
python3 motion_sensor.py &

wait

log_end "All scripts are running"