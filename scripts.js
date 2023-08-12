    const form = document.getElementById('myform');
    window.SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults= true;  

    recognition.addEventListener('result', async (event) => 
    {
        const transcripts = event.results[0][0].transcript;
        const copy = transcripts.toLowerCase();
        console.log(transcripts);
        if(copy.includes('weather in'))
        {
            
            const array = transcripts.split(' ')
            let city;
            if(array.at(-2) === 'in')
            {
                city = array.at(-1);
            }
            else
            {
                mcity = [array.at(-2), array.at(-1)];
                city = mcity.join(' ')
            }
            try{
                let total_data = await getweatherdata(city)
                console.log(total_data)
                let temp = total_data.main.temp;
                let rtemp= Math.round(temp);
                document.getElementById('city_temp').innerHTML = `Weather in ${city} is ${rtemp} degrees Farenheit`;
            }
            catch(err)
            {
                console.log("error");
            }
        };

    });
    recognition.addEventListener('end', recognition.start);
    recognition.start();
    function getweatherdata(city){
        let api_key = 'a1478f68863da10e939bcbd7551b2c6f';
        try 
        {
            let response  =  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`)
            return response.then((data) => data.json());
        }
        catch(err){
            // console.log("Error Fetching City Data:");
        }
    };


    form.addEventListener('submit', async(event) => 
    {
        event.preventDefault(); 
        let city = form.elements['city'].value;
        let total_data = await getweatherdata(city);
        let temp = total_data.main.temp;
        let rtemp= Math.round(temp);
        document.getElementById('city_temp').innerHTML = `Weather in ${city} is ${rtemp} degrees Farenheit`;
    });


    