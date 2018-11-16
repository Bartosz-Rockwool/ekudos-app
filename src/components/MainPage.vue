<template>
    <v-content>
        <section>
            <v-layout align-center justify-center id="kudo">
                <v-flex xs12 sm8 md4 mt-5>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="#d20014">
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
                            <v-btn color="#d20014" dark @click="submitEntry">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </section>
        <section>
            <v-dialog
                v-model="dialog"
                width="800">
                <v-card>
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline font-weight-bold">{{ this.kudoses[this.selected].who }}</span>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-img>
                    <v-card-title>
                    <div>
                        <span class="title font-weight-light">{{ this.kudoses[this.selected].title }}</span><br>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="dialog = false"> OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-layout row id="kudo-bord">
                <v-flex xs12 sm6 offset-sm3 mb-5>
                    <v-card>
                        <v-toolbar color="#d20014" dark>
                            <v-toolbar-title>Who got kudos</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
            
                        <v-list two-line>
                            <template v-for="(kudos, index) in kudoses">
                                <v-subheader
                                    v-if="kudos.header"
                                    :key="kudos.header">
                                    {{ kudos.header }}
                                </v-subheader>
                    
                                <v-divider
                                    v-else-if="kudos.divider"
                                    :inset="kudos.inset"
                                    :key="index">
                                </v-divider>
                    
                                <v-list-tile
                                    v-else
                                    :key="kudos.title + index"
                                    avatar
                                    @click="selectKudos(index)">

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
    dialog: false,
    name: '',
    description: '',
    kudoses: [],
    selected: 0
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
                
           
        },
        selectKudos(kudosIndex) {
            this.dialog = true;
            this.selected = kudosIndex;
        }
    }
};
</script>

<style>
.v-content {
    margin-top: -64px;
    background-image: url('../assets/rock7.jpg')
}

.v-textarea .v-text-field__slot {
    height: 32px;
} 

.v-textarea textarea {
    padding-bottom: 0;
} 

#kudo {
    margin-top: 100px;
    margin-bottom: 180px;
}
</style>