<template>
    <v-content>
        <section>
            <v-parallax :src="require('../assets/main-page-background.jpg')" height="600">
                <v-layout align-center justify-center id="kudo">
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Kudos for ...</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field 
                                        prepend-icon="person" 
                                        name="name" 
                                        label="Whom" 
                                        type="text"
                                        v-model="name"
                                    >
                                    </v-text-field>
                                    <v-textarea
                                        rows="1"
                                        prepend-icon="subject"
                                        name="description"
                                        label="What for"
                                        v-model="description"
                                    ></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="submitEntry">Add</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-parallax>
        </section>
        <section>
            <v-layout row id="kudo-bord">
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Who got kudos</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
            
                    <v-list two-line>
                        <template v-for="(kudos, index) in kudoses">
                            <v-subheader
                                v-if="kudos.header"
                                :key="kudos.header"
                            >
                                {{ kudos.header }}
                            </v-subheader>
                
                            <v-divider
                                v-else-if="kudos.divider"
                                :inset="kudos.inset"
                                :key="index"
                            ></v-divider>
                
                            <v-list-tile
                                v-else
                                :key="kudos.title + index"
                                avatar
                            >
                                <v-list-tile-avatar>
                                    <img :src="kudos.avatar">
                                </v-list-tile-avatar>
                
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="kudos.who"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="kudos.title"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                    </v-card>
                </v-flex>
                </v-layout>
        </section>
    </v-content>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    name: '',
    description: '',
    kudoses: [
        { header: 'Today' },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            who: "Nobody",
            title: "For sth from sb"
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            who: "Nobody",
            title: "For sth from sb"
        },
        { divider: true, inset: true }
    ]
  })
  ,
  mounted () {
    axios
      .get('http://ekudosapi.azurewebsites.net/api/ekudos', { crossdomain: true })
      .then(response => (this.kudoses = response.data))
  },
  methods: {
      submitEntry: function() {
            axios.post('http://ekudosapi.azurewebsites.net/api/ekudos', { Whom: this.name, Description: this.description })
                .then(response => {
                    this.responseData = response.data;
                    alert('Your e-kudos has been sent');
                })
                .catch(error => { error });
                
           
      }}
};
</script>

<style>
.v-content {
    margin-top: -64px;
}

.v-card {
    margin-top: 48px;
}

.v-textarea .v-text-field__slot {
        height: 32px;
} 

.v-textarea textarea {
    padding-bottom: 0;
} 
</style>