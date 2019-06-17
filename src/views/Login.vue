<template>
    <div class="login">
        <div class="row">
            <label for="email">E-mail*</label>

            <div>
                <input
                        id="email"
                        type="email"
                        name="email"
                        v-model="email"
                >
            </div>
        </div>

        <div class="row">
            <label id="texto-titulo" for="phone" class="col-lg-4 col-form-label">Telefone*</label>

            <div>
                <input
                        id="phone"
                        name="phone"
                        type="password"
                        v-model="phone"
                >
            </div>
        </div>

        <div>
            <button
                    @click="logar()"
                    type="submit">
                Entrar
            </button>
        </div>
        {{users}}
    </div>
</template>

<script>
    import {httpUsers} from '../service/config.js'

    export default {
        name: 'home',
        data() {
            return {
                email: '',
                phone: '',
                users: []
            }
        },
        methods: {
            logar() {
                if (this.email === '') {
                    return
                }
                httpUsers.get('/users', {
                    params: {
                        email: this.email,
                        phone: this.phone
                    }
                }).then(response => {
                    if (response.data.length > 0) {
                        this.users = response.data
                        alert('achou')
                        return
                    }
                    alert('não achou')
                }).catch(() => {
                    alert('não achou')
                })
            }
        }
    }
</script>
<style>
    .login {
        width: 50%;
        margin-top: 50px;
        margin-left: 25%;
        margin-right: 25%;
    }
</style>
