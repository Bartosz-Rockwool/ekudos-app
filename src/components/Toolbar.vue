<template>
    <v-toolbar app flat class="white" height="105" >
        <a href="#kudo">
            <img src="../assets/rockudo_logo_black.svg" height="75"/>
        </a>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat href="#kudo"  @click="setFocusOnForm">
                <div class="img-with-text">
                    <img src="../assets/mainmenu_1.png"/>
                    <p class="font-weight-black">Give Kudos</p>
                </div>
            </v-btn>
            <v-btn flat href="#kudo-bord">
                <div class="img-with-text">
                    <img src="../assets/mainmenu_2.png"/>
                    <p class="font-weight-black">Kudo Board</p>
                </div>
            </v-btn>
            <v-btn flat href="#kudo-info">
                <div class="img-with-text">
                    <img src="../assets/mainmenu_3.png"/>
                    <p class="font-weight-black">About Kudo</p>
                </div>                
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    methods: {
        setFocusOnForm() {
            this.$eventBus.$emit('set-focus-in-form-on-input-whom');
        }
    }
};
</script>

<style>
    .img-with-text {
        text-align: justify;
        font-size: 15px;
        font-weight: bold;
    }

    .img-with-text img {
        display: block;
        margin: 15px auto;
    }
</style>