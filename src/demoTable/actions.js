import ApiServices from '../_services/ApiServices';

const CountryActions = {
    getCountries: ()=>{
        return ApiServices.get('/all?fields=name;alpha2Code;capital;region;area');
    },
}

export default CountryActions;