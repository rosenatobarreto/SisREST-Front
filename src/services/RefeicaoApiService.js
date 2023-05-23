import ApiService from './ApiService';

export default class RefeicaoApiService extends ApiService{
    constructor(){
        super('/refeicao');
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