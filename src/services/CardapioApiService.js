import ApiService from './ApiService';

export default class CardapioApiService extends ApiService{
    constructor(){
        super('/cardapio');
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
    find(id){
        return this.get(`/buscarPorID/${id}`)
    }
    findAll(){
        return this.getAll('/buscarTodos');
    }
}