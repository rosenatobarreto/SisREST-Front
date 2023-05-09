import ApiService from './ApiService';

export default class ContaServidorApiService extends ApiService{
    constructor(){
        super('/contaServidor');
    }
    create(object){
        return this.post('/criar', object);
    }
    update(id,object){
        return this.put(`/atualizar/${id}`, object);
    }
    delete(id){
        return super.delete(`/deletar/${id}`)
    }
    // find(id,object){
    //     return this.get(`/${id}`, object);
    // }
    // find(id){
    //     return this.get(`/${id}`)
    // }
    // findAll(){
    //     return this.getAll('/buscarTodos');
    // }
}