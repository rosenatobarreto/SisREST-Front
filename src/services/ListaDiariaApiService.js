import ApiService from './ApiService';

export default class ListaDiariaApiService extends ApiService{
    constructor(){
        super('/listaDiaria');
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
    find(id){
        return this.get(`/${id}`);
    }
    findAll(){
        return this.getAll(`/buscarTodos`);
    }
}