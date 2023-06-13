import ApiService from './ApiService';

export default class RestricaoAlimentarApiService extends ApiService{
    constructor(){
        super('/restricaoAlimentar');
    }
    create(object){
        return this.post(`/criar`, object);
    }
    update(id,object){
        return this.put(`/atualizar/${id}`, object);
    }
    delete(id){
        return super.delete(`/deletar/${id}`)
    }
    find(params){
        return this.get(`/buscarPorID/${params}`);
    }
    findAll(){
        return this.get(`/buscarTodos`);
    }
}