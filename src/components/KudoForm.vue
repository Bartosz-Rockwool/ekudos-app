<template>
    <v-layout justify-center id="kudo">
        <v-flex xs12 sm8 md6 mt-5>
            <v-card dark class="transparent" flat>
                <v-card-title class="display-2 font-weight-bold" >
                    <v-card-text>
                        <p class="text-xs-center"><u class="red-underline">GIVE KUDOS</u> TO YOUR COLLEAGUE</p>
                    </v-card-text>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="person" name="name" label="to Whom?" type="text" ref="whom" v-model="name">
                        </v-text-field>
                        <v-textarea rows="1" prepend-icon="subject" name="description" label="What do you want to say?" v-model="description">
                        </v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="text-xs-center">
                        <v-btn color="#d20014" dark large>Add</v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        dialog: false,
        name: '',
        description: '',
        kudoses: [],
        selected: 0,
        title: '',
        whom: ''
    }),
    methods: {
        submitEntry() {
            axios.post('http://ekudosapi.azurewebsites.net/api/ekudos', { Whom: this.name, Description: this.description })
                .then(response => {
                    this.responseData = response.data;
                    alert('Your e-kudos has been sent');
                })
                .catch(error => { error });
        }
    }
};
</script>

<style>
    .transparent {
        background-color: transparent!important;
        border-color: transparent!important;
    }
    
    .red-underline {
        text-decoration-color: red; 
    }
</style>