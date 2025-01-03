 // Éléments du DOM
 const startButton = document.getElementById('startButton');
 const recordingCard = document.getElementById('recordingCard');
 const microIcon = document.getElementById('microIcon');
 const wavesContainer = document.getElementById('wavesContainer');
 const actionButtons = document.getElementById('actionButtons');
 const sendButton = document.getElementById('sendButton');
 const cancelButton = document.getElementById('cancelButton');
 const trashIcon = document.getElementById('trashIcon');

 let isRecording = false;

 // Démarrer l'enregistrement
 startButton.addEventListener('click', () => {
   startButton.style.display = 'none';
   recordingCard.style.display = 'block';
 });

 // Démarrer l'enregistrement vocal
 microIcon.addEventListener('click', () => {
   if (!isRecording) {
     isRecording = true;
     actionButtons.style.display = 'flex';
     createWave();
   }
 });

 // Annuler l'enregistrement
 cancelButton.addEventListener('click', () => {
   // Vider le DOM
   document.body.innerHTML = '';

   // Charger le nouveau code
   const newCode = `
     <style>
       /* Styles généraux */
       body {
         font-family: Arial, sans-serif;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         background-color: #f0f2f5;
         margin: 0;
       }

       /* Conteneur de l'animation */
       .container {
         position: relative;
         width: 100%;
         height: 100%;
         top:-300px;
       }

       /* Icône du micro */
       #microIcon {
         font-size: 48px;
         color: #333;
         position: absolute;
         top: -60px; /* Commence en dehors de l'écran */
         left: 50%;
         transform: translateX(-50%);
         animation: fallIntoTrash 2s forwards;
       }

       /* Icône de la poubelle */
       #trashIcon {
         font-size: 48px;
         color: #333;
         position: absolute;
         bottom: 20px;
         left: 50%;
         transform: translateX(-50%);
       }

       /* Animation de chute */
       @keyframes fallIntoTrash {
         0% { top: -60px; transform: translateX(-50%) rotate(0deg); }
         50% { transform: translateX(-50%) rotate(360deg); }
         100% { top: calc(100% - 80px); transform: translateX(-50%) rotate(720deg); }
       }
     </style>
     <div class="container">
       <div id="microIcon">🎙️</div>
       <div id="trashIcon">🗑️</div>
     </div>
     <script>
       // Optionnel : Redémarrer l'animation au clic
       document.body.addEventListener('click', () => {
         const microIcon = document.getElementById('microIcon');
         microIcon.style.animation = 'none';
         setTimeout(() => {
           microIcon.style.animation = 'fallIntoTrash 2s forwards';
         }, 10);
       });
     <\/script>
   `;

   // Injecter le nouveau code dans le body
   document.body.innerHTML = newCode;
 });

 // Envoyer l'enregistrement
 sendButton.addEventListener('click', () => {
   alert('Enregistrement envoyé !');
   recordingCard.style.display = 'none';
   startButton.style.display = 'block';
   wavesContainer.innerHTML = '';
 });

 // Créer des ondes circulaires
 function createWave() {
   if (isRecording) {
     const wave = document.createElement('div');
     wave.classList.add('wave');
     wavesContainer.appendChild(wave);
     setTimeout(() => wave.remove(), 1500);
     setTimeout(createWave, 500);
   }
 }