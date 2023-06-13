import ApiService from './ApiService';

export default class UploadCsvApiService extends ApiService{
    constructor(){
        super('/csv');
    }

    processar(object){
        return this.post('/processar', object);
    }

}