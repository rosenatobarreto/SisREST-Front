import ApiService from './ApiService';

export default class UploadCsvApiService extends ApiService{
    constructor(){
        super('/csv');
    }

    create(object){
        return this.post('/processar', object);
    }

}