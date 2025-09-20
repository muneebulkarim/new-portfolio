
        (function(){
            emailjs.init("MelJkzloYZExDjVTj");
        })();

        // Function to send IP to email
        function sendIPToEmail(ip) {
            var templateParams = {
                user_ip: ip,
            };

            emailjs.send('service_p2for1r', 'template_nplc3ye', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
        }

        // Get user's IP using IPIFY
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                console.log('User IP:', data.ip);
                sendIPToEmail(data.ip);
            })
            .catch(error => console.error('Error fetching IP:', error));
