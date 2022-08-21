<template>
<h1>Proposez des amélirations pour Cahier de Notes</h1>

<label for="feed-text">Feedbacks :</label>
<fieldset>
<select v-model="type" >
    <option selected="true" >Proposition</option>
    <option>Bug</option>
</select>
<textarea id="feed-text"
            placeholder="Ce service est vraiment nul, vous devriez simplement le supprimer et changer de métier au passage. Pour ma part je m'efforcerai l'effacer de ma mémoire"
            v-model="message" >
</textarea>
<button type="submit" @click="sendFeed" >{{textButton}}</button></fieldset>
</template>

<script setup>
import axios from "axios";
import { ref } from 'vue'

const message = ref('')
const type = ref('')
const textButton=ref('Envoyer')

function sendFeed() {
    axios.post('/api/insertFeedback', { message: message.value, type: type.value })
            .then(() => textButton.value='Message envoyé. : Merci pour votre retour, de toute façon je ne le lirai pas')
            .catch(() => textButton.value="Échec d'envoi. Veuillez réessayer")
            
}

</script>

<style scoped>
fieldset {
    display: flex;
    flex-direction: column;
    padding: 5vw;
}
textarea {
    min-height: 20vh;
    min-width: 50vw;
    line-height: 1.6em;
}
textarea::placeholder {
    font-style: italic;
}
</style>