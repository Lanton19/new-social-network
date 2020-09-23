import axios from "axios";

// общие настройки
export const instance = axios.create({      
    withCredentials: true,   // объект настроек
    baseURL: `https://social-network.samuraijs.com/api/1.0/`, // базовый url, будет приклеиватся к строке
    headers: {//заголовки
        'API-KEY': '95c27e8c-de5f-4834-bf09-c3f27c5f7a82' // ключ для работы с API
    }
});

export const usersAPI = {
    requestUsers(page = 1, pageSize = 10) {
        return instance.get(`users?page=${page}&count=${pageSize}`)
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
    },
    savePhoto (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });  // загрузка фото
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
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