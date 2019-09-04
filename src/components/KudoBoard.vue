<template>
    <v-content>
        <v-dialog v-model="dialog" width="800">
            <v-card>
                <v-container fill-height fluid>
                    <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline font-weight-bold">{{ whom }}</span>
                    </v-flex>
                    </v-layout>
                </v-container>
                <v-card-title>
                <div>
                    <span class="title font-weight-light">{{ title }}</span><br>
                </div>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="dialog = false"> OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-layout row id="kudo-bord" >
            <v-flex xs12 sm8 offset-sm2 mb-5 >
                <v-card>
                    <v-toolbar color="#d20014" dark>
                        <v-layout>
                            <v-flex xs8>
                                <v-layout class="v-text-field">
                                    <v-flex xs1>
                                        <img src="../assets/header_kudoboard.png"/>
                                    </v-flex>
                                    <v-flex xs11>
                                        <v-toolbar-title>KUDO BOARD</v-toolbar-title>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4>
                                <v-combobox
                                    v-model="selectedSort"
                                    :items="items"
                                    @change="changeSort"
                                ></v-combobox>
                            </v-flex>
                        </v-layout>
                     </v-toolbar>
                     <v-list two-line>
                        <div class="ma-8 d-flex align-center loader" v-if="listOfKudosIsLoading">
                            <v-progress-circular
                                :value="40"
                                :indeterminate="true"
                                :size="100"
                                :width="10"
                                color="#d20014"
                            >
                            </v-progress-circular>
                        </div>
                        <div v-if="!listOfKudosIsLoading">
                        <template v-for="(kudos, index) in kudoses">
                            <v-subheader v-if="kudos.header" :key="kudos.header"> {{ kudos.header }} </v-subheader>
                            <v-divider v-else-if="kudos.divider" :inset="kudos.inset" :key="index"> </v-divider>
                            <v-list-tile v-else :key="kudos.title + index" class="mainTile" avatar>
                                <v-list-tile-avatar class="avatar">
                                    <img src="../assets/avatar_female.png"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content class="tile">
                                    <v-list-tile-title>{{kudos.who}}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{kudos.title}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-icon large class="tileIcon">arrow_back</v-icon>
                                <v-list-tile-avatar class="avatar">
                                    <img src="../assets/avatar_male.png"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content class="tile">
                                    <v-list-tile-title>{{kudos.whoFrom}}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{kudos.when}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-spacer></v-spacer>
                                <div class="text-xs-center">
                                    <v-btn color="#d20014" dark large @click="selectKudos(index)">Show Kudo</v-btn>
                                </div>
                            </v-list-tile>
                        </template>
                        </div>
                     </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        dialog: false,
        listOfKudosIsLoading: true,
        kudoses: [],
        selected: 0,
        title: '',
        whom: '',
        selectedSort: { text: 'Newest', value: 'date-descending' },
        items: [
            { text: 'Newest', value: 'date-descending' },
            { text: 'Oldest', value: 'date-ascending' }
        ]
    }),
     mounted () {
         var url = '';
            if(location.protocol != 'https:'){
                url = 'http://ekudosapi.azurewebsites.net/api/ekudos';
            } else {
                url = 'https://ekudosapi.azurewebsites.net/api/ekudos';
            }
        axios
            .get(url)
            .then(response => {
                this.listOfKudosIsLoading = false;
                this.kudoses = this.parseDate(response.data);
            });

        this.$eventBus.$on('refresh-kudo-board', () => {
            this.changeSort();
        });
    },
    methods: {
        selectKudos(kudosIndex) {
            this.dialog = true;
            this.selected = kudosIndex;
            this.title = this.kudoses[this.selected].title;
            this.whom = this.kudoses[this.selected].who;
        },
        parseDate(response) {
            return response
                .map(
                    (kudos) => {
                        var options = { year: 'numeric', month: 'long', day: 'numeric' };
                        kudos.when = new Date(kudos.when).toLocaleDateString("en-US", options);
                        return kudos;
                    }            
                );
        },
        changeSort() {
            var direct = this.selectedSort.value === 'date-descending' ? 'Desc' : 'Asc';
            var sort = "When";
            var url = '';
            if(location.protocol != 'https:'){
                url = `http://ekudosapi.azurewebsites.net/api/ekudos/0/0/${sort}/${direct}`;
            } else {
                url = `https://ekudosapi.azurewebsites.net/api/ekudos/0/0/${sort}/${direct}`;
            }
            axios
                .get(url)
                .then(response => (this.kudoses = this.parseDate(response.data)));
        }
    }
};
</script>

<style>
    .tile {
        max-width: 200px;
    }
    
    .tileIcon {
        margin-right: 50px;
        margin-left: 50px;
    }

    .avatar {
        margin-right: 20px;
        min-width: 0px;
    }

    .loader {
        width:100px;
        margin:auto;
        height:300px;
    }
</style>
