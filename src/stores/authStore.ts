import { makeAutoObservable } from 'mobx'
import { faker } from '@faker-js/faker'
import { IUser, TAuthFieldType } from '@/types/auth'

class AuthStore {
    isAuthenticated: boolean = false
    user: IUser | null = null
    token: string | null = null

    constructor() {
        makeAutoObservable(this)
        this.getUserFromLocalStorage()
    }
    //checking the authorization token
    getUserFromLocalStorage() {
        const token = localStorage.getItem('token')
        const userString = localStorage.getItem('user')

        if (token && userString) {
            const user = JSON.parse(userString)

            this.isAuthenticated = true
            this.token = token
            this.user = user
        }
    }

    async login(values: TAuthFieldType): Promise<boolean> {
        const { username, password } = values
        const usersString = localStorage.getItem('userDB')
        const users: IUser[] = usersString ? JSON.parse(usersString) : []

        const user = users.find(
            (user) => user.username === username && user.password === password
        )
        //creating an authorization token
        if (user) {
            const token = faker.string.uuid()

            this.isAuthenticated = true
            this.token = token
            this.user = { id: user.id, username: user.username, password: '' }

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(this.user))

            return true
        }
        return false
    }
    async register(values: TAuthFieldType): Promise<boolean> {
        const { username, password } = values
        const usersString = localStorage.getItem('userDB')
        const users: IUser[] = usersString ? JSON.parse(usersString) : []

        const user = users.some((user) => user.username === username)
        if (user) return false

        const newUser: IUser = {
            id: `${users.length + 1}`,
            username,
            password,
        }

        const newUsers = [...users, newUser]
        localStorage.setItem('userDB', JSON.stringify(newUsers))
        this.login(values)
        return true
    }
    logout() {
        window.location.href = '/'

        this.isAuthenticated = false
        this.token = null
        this.user = null

        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}

export const authStore = new AuthStore()
