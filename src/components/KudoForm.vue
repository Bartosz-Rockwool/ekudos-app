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
                        <v-text-field prepend-icon="person" name="whoFrom" label="from Who?" type="text" ref="whoFrom" readonly :value="whoFrom">
                        </v-text-field>
                        <v-textarea rows="1" prepend-icon="subject" name="description" label="What do you want to say?" v-model="description">
                        </v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="text-xs-center">
                        <v-btn color="#d20014" v-if="!addingKudoLoader" dark large @click="submitEntry" :disabled="name==='' || description === '' || whoFrom === ''">Add</v-btn>
                        <v-progress-circular v-if="addingKudoLoader" indeterminate color="red"></v-progress-circular>
                    </div>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';

// https://alligator.io/vuejs/component-communication/
// https://alligator.io/vuejs/global-event-bus/

export default {
    data: () => ({
        name: '',
        description: '',
        addingKudoLoader: false
    }),
    computed: {
        whoFrom: function() { return this.$store.getters.user.unique_name; },
    },
    methods: {
        submitEntry() {
            this.addingKudoLoader = true;

            var url = '';
            if(location.protocol != 'https:'){
                url = 'http://ekudosapi.azurewebsites.net/api/ekudos';
            } else {
                url = 'https://ekudosapi.azurewebsites.net/api/ekudos';
            }

            axios.post(url, { Whom: this.name, Description: this.description, WhoFrom: this.whoFrom })
                .then(response => {
                    this.responseData = response.data;
                    this.name = '';
                    this.description = '';
                    this.$eventBus.$emit('refresh-kudo-board');
                    this.addingKudoLoader = false;
                })
                .catch(error => { error });
        }
    },
    mounted: function () {
        this.$eventBus.$on('set-focus-in-form-on-input-whom', () => {
            this.$nextTick(() => this.$refs.whom.focus())
        });
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