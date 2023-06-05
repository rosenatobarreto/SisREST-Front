import ApiService from './ApiService';

export default class PedidoAcessoApiService extends ApiService{
    constructor(){
        super('/csv');
    }
    create(object){
        return this.post(`/processar`, object);
    }
    // update(id,object){
    //     return this.put(`/${id}`, object);
    // }
    // delete(id){
    //     return super.delete(`/deletar/${id}`)
    // }
    // find(params){
    //     return this.get(`/${params}`);
    // }
    // findAll(){
    //     return this.getAll(`/buscarTodos`);
    // }
}