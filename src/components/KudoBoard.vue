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
            <v-flex xs12 sm6 offset-sm3 mb-5 >
                <v-card>
                    <v-toolbar color="#d20014" dark>
                        <img src="../assets/header_kudoboard.png"/>
                        <v-toolbar-title>KUDO BOARD</v-toolbar-title>
                     </v-toolbar>
                     <v-list two-line>
                        <template v-for="(kudos, index) in kudoses">
                            <v-subheader v-if="kudos.header" :key="kudos.header"> {{ kudos.header }} </v-subheader>
                            <v-divider v-else-if="kudos.divider" :inset="kudos.inset" :key="index"> </v-divider>
                            <v-list-tile v-else :key="kudos.title + index" class="mainTile" avatar>
                                <v-list-tile-avatar class="avatar">
                                    <img src="../assets/avatar_female.png"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content class="tile">
                                    <v-list-tile-title v-html="kudos.who"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="kudos.title"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-icon large class="tileIcon">arrow_back</v-icon>
                                <v-list-tile-avatar class="avatar">
                                    <img src="../assets/avatar_male.png"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content class="tile">
                                    <v-list-tile-title v-html="kudos.who"></v-list-tile-title>
                                    <v-list-tile-sub-title>DD/MM/YYYY</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-spacer></v-spacer>
                                <div class="text-xs-center">
                                    <v-btn color="#d20014" dark large @click="selectKudos(index)">Show Kudo</v-btn>
                                </div>
                            </v-list-tile>
                        </template>
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
        kudoses: [],
        selected: 0,
        title: '',
        whom: ''
    }),
     mounted () {
        axios
        .get('http://ekudosapi.azurewebsites.net/api/ekudos', { crossdomain: true })
        .then(response => (this.kudoses = response.data))
    },
    methods: {
        selectKudos(kudosIndex) {
            this.dialog = true;
            this.selected = kudosIndex;
            this.title = this.kudoses[this.selected].title;
            this.whom = this.kudoses[this.selected].who;
        }
    }
};
</script>

<style>
    .tile {
        max-width: 120px;
    }
    
    .tileIcon {
        margin-right: 50px;
        margin-left: 50px;
    }

    .avatar {
        margin-right: 20px;
        min-width: 0px;
    }
</style>
