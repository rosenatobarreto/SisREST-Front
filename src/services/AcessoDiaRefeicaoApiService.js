import ApiService from './ApiService';

export default class AcessoDiaRefeicaoApiService extends ApiService{
    constructor(){
        super('/acessoDiaRefeicao');
    }
    create(object){
        return this.post(`/criar`, object);
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
        return this.get(`/buscarTodos`);
    }
}