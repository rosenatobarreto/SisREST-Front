import ApiService from './ApiService';

export default class EditalApiService extends ApiService{
    constructor(){
        super('/edital');
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
    find(params){
        return this.get(`/${params}`);
    }
    findAll(){
        return this.getAll('/buscarTodos');
    }
}