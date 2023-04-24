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
        return super.delete(`/deletar/${id}`)
    }
    // find(id,object){
    //     return this.get(`/${id}`, object);
    // }
    find(id){
        return this.get(`/${id}`)
    }
    findAll(){
        return this.getAll('/buscarTodos');
    }
}