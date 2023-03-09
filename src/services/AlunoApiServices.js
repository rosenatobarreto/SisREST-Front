import ApiService from './ApiService';

export default class AlunoApiService extends ApiService{
    constructor(){
        super('/aluno');
    }
    create(object){
        return this.post('/upload', object);
    }
    /*update(id,object){
        return this.put(`/${id}`, object);
    }
    delete(id){
        return super.delete(`/${id}`)
    }
    find(params){
        return this.get(`/${params}`);
    }
    findAll(){
        return this.getAll('/buscarTodos');
    }*/
}