# requires termux-api and speedtest-go packages installed
# need to install termux:api app from f droid
# Pass the minimum speed limit as an argument

download=$(speedtest-go --json --unit=decimal-bytes | jq .servers[0].test_duration.download)
if [ "$download" -lt "$1" ]; then
    termux-wifi-enable false
    echo "slow"
else
    echo "fast"
fi
