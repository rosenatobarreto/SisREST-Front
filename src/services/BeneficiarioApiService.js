import ApiService from './ApiService';

export default class BeneficiarioApiService extends ApiService{
    constructor(){
        super('/beneficiario');
    }
    create(object){
        return this.post('/criar', object);
    }
    update(id,object){
        return this.put(`/${id}`, object);
    }
    delete(id){
        return super.delete(`/${id}`)
    }
    find(params){
        return this.get(`/${params}`);
    }
    findAll(){
        return this.getAll('/buscarTodos');
    }
}