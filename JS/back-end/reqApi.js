async function buscarApi(nome){
    const url = await fetch('https://fantastic.jobs/api');
    
    try{
        const resposta = await fetch(url);
        const dados = await resposta.json; 
        const jobI = dados.data;
        const attr = jobI[0].atributes;

        console.log(`titulo:  ${canonicalTitle}`);
        console.log("...........");
        console.log("...............")
        console.log("sinopse:" + jobI.sinopsis)

    }catch (error){
        console.log(error)
        
    }

}

for(let  c = 0; c <10; c++){
    for(let b = 0; b<10; b++){
        console.log(c + "x" + b + "=" + c*b);
    }
}