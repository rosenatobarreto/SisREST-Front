import ApiService from './ApiService';

export default class ItemCardapioDiaApiService extends ApiService{
    constructor(){
        super('/itemCardapioDia');
    }
    update(id,object){
        return this.put(`/atualizar/${id}`, object);
    }
    delete(id){
        return super.delete(`/deletar/${id}`)
    }
    find(id){
        return this.get(`/buscarPorID/${id}`)
    }
    findAll(){
        return this.getAll('/buscarTodos');
    }
}