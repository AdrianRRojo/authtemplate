import { FormData } from '../components/login'
import { useNavigate } from 'react-router-dom'
import http from '../http-common';

export default new class DataService{
    getAll(){
        return http.get<Array<FormData>>("/")
    }
    get(id: string){
        return http.get<FormData>('/register/${id}');
    }
    create(data: FormData) {
        return http.post<FormData>("/register", data);
      }
    
      update(data: FormData, id: any) {
        return http.put<any>(`/register/${id}`, data);
      }
    
      delete(id: any) {
        return http.delete<any>(`/register/${id}`);
      }
    
      deleteAll() {
        return http.delete<any>(`/register`);
      }
    
      findByFname(fname: string) {
        return http.get<Array<FormData>>(`/register?fname=${fname}`);
      }
}
export const Register = async (data: FormData) => { 
    
    try{
        console.log("data: ", data)
    }catch{
        console.log("error")
    }
}