import axios from "axios";

// общие настройки
export const instance = axios.create({      
    withCredentials: true,   // объект настроек
    baseURL: `https://social-network.samuraijs.com/api/1.0/`, // базовый url, будет приклеиватся к строке
    headers: {//заголовки
        'API-KEY': 'b82f56b9-ac97-49c4-9538-0c016b5f1a27' // ключ для работы с API
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;   // промис для получения только data, без лишней информации в ответе от сервера
            });
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object. ')
        return profileAPI.getProfile(userId) // делегирование метода, чтобы не переписывать везде  
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);  // переход к юзеру    
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);   // получить статус
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status}); // изменение статуса
    }
}

export const authAPI = {                        
    me () {
        return instance.get(`auth/me`);   // промис аутентификация
    },
    login (email, password, rememberMe=false) {
        return instance.post(`auth/login`, {email, password, rememberMe});  
    },
    logout () {
        return instance.delete(`auth/login`); 
    }

}