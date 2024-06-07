const qualityCalculator = {
    calcBalneability: (eColi) => {
        if(eColi > 1000)
            return "Imprópria";

        return "Própria";
    },

    calcIQA: (iqa) => {
        if(iqa >= 80){
            return "Ótima";
        }else if(iqa > 51 && iqa <= 79){
            return "Boa";
        }else if(iqa > 36 && iqa <= 51){
            return "Regular";
        }else if(iqa > 19 && iqa <= 36){
            return "Ruim";
        }else if(iqa <= 19){
            return "Péssima";
        }
    }
}

export default qualityCalculator;