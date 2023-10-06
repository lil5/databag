import { NativeModules, Platform } from 'react-native'

const Strings = [
  {
    // settings screen
    languageCode: 'en',
    visibleRegistry: 'Visible in Registry',
    edit: 'Edit',
    enableNotifications: 'Push Notifications',
    sealedTopics: 'Sealed Topics',
    colorMode: 'Color Mode',
    hourMode: 'Hour',
    dateMode: 'Date',
    language: 'Language',
    logout: 'Logout',
    changeLogin: 'Change Credentials',
    deleteAccount: 'Delete Account',
    contacts: 'Contacts',
    topics: 'Topics',
    messages: 'Messages',
    support: 'Support',
    blocked: 'Blocked',
    account: 'Account',
    display: 'Format',
    messaging: 'Messaging',
    timeFull: '24h',
    timeHalf: '12h',
    monthStart: 'mm/dd',
    monthEnd: 'dd/mm',
    error: 'Error',
    tryAgain: 'Please try again.',

    // seal wizard
    sealUnset: 'Generate a key to enable end-to-end encrypted topics.',
    sealUnlocked: 'Disabling the sealing key will block access to all end-to-end encrypted topics from this device until the key is unlocked again.',
    sealLocked: 'Unlock the sealing key to support end-to-end encrypted topics on this device.',
    sealDelete: 'Deleting the sealing key will premanently remove access to any existing end-to-end encrypted topics for ALL of your devices.',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    generate: 'Generate',
    disable: 'Disable',
    delete: 'Delete',
    unlock: 'Unlock',
    removeSeal: 'Remove Sealing Key',
    disableSeal: 'Disable Sealing Key',
    unlockSeal: 'Unlock Sealing Key',
    typeDelete: 'Type [delete]',
    deleteKey: 'delete',
    enableTopics: 'Enable Sealed Topics',
    manageTopics: 'Manage Sealing Key',
    changePassword: 'Change sealing key password.',
    update: 'Change',
    changeKey: 'Change Key Password',
    delayMessage: 'Key generation can take several minutes.',
    changeMessage: 'Here you can change the username and/or password for your account.',

    // settings modals
    cancel: 'Cancel',
    confirmLogout: 'Logout',
    loggingOut: 'Logging Out',
    username: 'Username',
    save: 'Save',
    notAvailable: 'Username Not Available',
    blockedContacts: 'Blocked Contacts',
    restoreContact: 'Restore Contact?',
    blockedTopics: 'Blocked Topics',
    restoreTopic: 'Restore Topic?',
    blockedMessages: 'Blocked Messages',
    restoreMessage: 'Restore Message?',
    close: 'Close',
    ok: 'OK',
    noBlockedContacts: 'No Blocked Contacts',
    noBlockedTopics: 'No Blocked Topics',
    noBlockedMessages: 'No Blocked Messages',
    restore: 'Restore',

    //profile page
    edit: 'Edit',
    name: 'Name',
    location: 'Location',
    description: 'Description',
    registryVisible: 'Visible in Registry',
    editImage: 'Edit Image',
    editDetails: 'Edit Details',

    // contacts page
    back: 'Back',
    deleteContact: 'Delete Contact',
    confirmDelete: 'Delete',
    disconnectContact: 'Disconnect from Contact',
    confirmDisconnect: 'Disconnect',
    blockContact: 'Block Contact',
    confirmBlock: 'Block',
    reportContact: 'Report Contact',
    confirmReport: 'Report',
    confirmed: 'Saved',
    pending: 'Unknown',
    connecting: 'Request Sent',
    connected: 'Connected',
    requested: 'Request Received',
    unsaved: 'Unsaved',
    offsync: 'Offsync',
    actionResync: 'Resync',
    actionConnect: 'Connect',
    actionAccept: 'Accept',
    actionSave: 'Save',
    actionCancel: 'Cancel',
    actionDisconnect: 'Disconnect',
    actionIgnore: 'Ignore',
    actionDelete: 'Delete',
    actionBlock: 'Block',
    actionReport: 'Report',
    actionLeave: 'Leave',

    // contact list page
    add: 'Add',
    contactFilter: 'Contacts',
    serverFilter: 'Server',
    usernameFilter: 'Username',
    viewProfile: 'View Profile',
    messageContact: 'Message Contact',
    callContact: 'Call Contact',
    noContacts: 'No Contacts Found',

    // channels list
    profile: 'Profile',
    contacts: 'Contacts',
    topics: 'Topics',
    subject: 'Subject (optional)',
    create: 'Create',
    sealed: 'Sealed',
    newTopic: 'New Topic',
    new: 'New',

    // details
    topic: 'Topic',
    host: 'host',
    guest: 'guest',
    leave: 'Leave',
    members: 'Members',
    editSubject: 'Edit Subject',
    topicMembers: 'Topic Members',
    leaveTopic: 'Leave Topic',
    deleteTopic: 'Delete Topic',
    blockTopic: 'Block Topic',
    reportTopic: 'Report Topic',
    unknown: 'unknown',

    accounts: 'Accounts',
    createAccount: 'Create Account',
    accessAccount: 'Access Account',
    token: 'Token',
    settings: 'Settings',
    federatedHost: 'Federated Host',
    storageLimit: 'Storage Limit (GB) / Account',
    keyType: 'Account Key Type',
    enableImage: 'Enable Image Queue',
    enableAudio: 'Enable Audio Queue',
    enableVideo: 'Enable Video Queue',
    enableCalls: 'Enable WebRTC Calls',
    relayUrl: 'Relay URL',
    relayUsername: 'Relay Username',
    relayPassword: 'Relay Password',

    newMessage: 'New Message',
    fontSize: 'Font Size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    fontColor: 'Font Color',
    selectedColor: 'Selected Color',

    login: 'Login',
    createAccount: 'Create Account',
    forgotPassword: 'Forgot Password',
    adminAccess: 'Admin Access',
    server: 'Server',
    access: 'Access',
    defaultPublic: 'The default public server is to test out the system. Use a private server otherwise.',
    confirmPassword: 'Confirm Password',
    accountLogin: 'Account Login',
    accessAccount: 'Access Account',
    agree: 'I agree to Terms of Service',
    terms: 'View Terms of Service',
    policy: 'Terms of Use and User Policy',

    editMessage: 'Edit Message Text',
  },
  {
    languageCode: 'fr',
    visibleRegistry: 'Visible dans le Registre',
    edit: 'Modifier',
    enableNotifications: 'Notifications Push',
    sealedTopics: 'Sujets Sécurisés',
    colorMode: 'Mode de Couleur',
    hourMode: 'Heure',
    dateMode: 'Date',
    language: 'Langue',
    logout: 'Déconnecter',
    changeLogin: 'Modifier l\'Accès',
    deleteAccount: 'Supprimer le Compte',
    contacts: 'Contacts',
    topics: 'Sujets',
    messages: 'Messages',
    support: 'Aide',
    blocked: 'Bloqués',
    account: 'Compte',
    display: 'Format',
    messaging: 'Messagerie',
    timeFull: '24h',
    timeHalf: '12h',
    monthStart: 'mm/jj',
    monthEnd: 'jj/mm',
    error: 'Erreur',
    tryAgain: 'Veuillez réessayer.',

    sealUnset: 'Générez une clé pour activer les sujets chiffrés de bout en bout.',
    sealUnlocked: 'La désactivation de la clé de scellement supprimera l\'accès à tous les sujets chiffrés de bout en bout jusqu\'à ce que la clé soit à nouveau déverrouillée.',
    sealLocked: 'Déverrouillez la clé de scellement pour activer les sujets chiffrés de bout en bout sur cet appareil.',
    sealDelete: 'La suppression de la clé de scellement supprimera définitivement l’accès à tous les sujets cryptés de bout en bout existants pour TOUS vos appareils.',
    password: 'Mot de passe',
    confirmPassword: 'Confirmez le mot de passe',
    generate: 'Générer',
    disable: 'Désactiver',
    delete: 'Supprimer',
    unlock: 'Activer',
    removeSeal: 'Supprimer la clé de sécurité',
    disableSeal: 'Désactiver la clé de sécurité',
    unlockSeal: 'Déverrouiller la clé de sécurité',
    typeDelete: 'Tapez [supprimer]',
    deleteKey: 'supprimer',
    enableTopics: 'Activer les Sujets Sécurisés',
    manageTopics: 'Gérer la clé de sécurité',
    changePassword: 'Changez le mot de passe de la clé de sécurité.',
    update: 'Mise à jour',
    changeKey: 'Changer le mot de passe clé',
    delayMessage: 'La génération de clé peut prendre plusieurs minutes.',
    changeMessage: 'Ici, vous pouvez modifier le nom d\'utilisateur et/ou le mot de passe de votre compte.',

    cancel: 'Annuler',
    confirmLogout: 'Déconnecter',
    loggingOut: 'Confirmation de la Déconnexion', 
    username: 'Nom d\'Utilisateur',
    save: 'Engegistrer',
    notAvailable: 'Nom d\'Utilisateur Indisponible',
    blockedContacts: 'Contacts Bloqués',
    restoreContact: 'Restaurer le Contact?',
    blockedTopics: 'Sujets Bloqués',
    restoreTopic: 'Restaurer le Sujet?',
    blockedMessages: 'Messages Bloqués',
    restoreMessage: 'Restaurer le Message?',
    close: 'Fermer',
    ok: 'OK',
    noBlockedContacts: 'Aucun Contact Bloqués',
    noBlockedTopics: 'Aucun Sujet Bloqué',
    noBlockedMessages: 'Aucun Message Bloqué',
    restore: 'Restaurer',

    //profile page
    edit: 'Modifier',
    name: 'Nom',
    location: 'Emplacement',
    description: 'Description',
    registryVisible: 'Visible dans le Registre',
    editImage: 'Modifier l\'Image',
    editDetails: 'Modifier les Détails',

    //constacts page
    back: 'Arrière',
    deleteContact: 'Supprimer le Contact',
    confirmDelete: 'Supprimer',
    disconnectContact: 'Déconnecter le Contact',
    confirmDisconnect: 'Déconnecter',
    blockContact: 'Bloquer le Contact',
    confirmBlock: 'Bloquer',
    reportContact: 'Signaler le Contact',
    confirmReport: 'Signaler',
    confirmed: 'Enregistré',
    pending: 'Inconnu',
    connecting: 'Demandé',
    connected: 'Connecté',
    requested: 'Reçue',
    unsaved: 'Non Enregistré',
    offsync: 'Hors Sync',
    actionResync: 'Resync',
    actionConnect: 'Connecter',
    actionAccept: 'Accepter',
    actionSave: 'Enregistrer',
    actionCancel: 'Annuler',
    actionDisconnect: 'Déconnecter',
    actionIgnore: 'Ignorer',
    actionDelete: 'Supprimer',
    actionBlock: 'Bloquer',
    actionReport: 'Signaler',

    //constact list page
    add: 'Ajouter',
    contactFilter: 'Contacts',
    serverFilter: 'Serveur',
    usernameFilter: 'Nom d\'Utilisateur',
    viewProfile: 'Voir le Profil',
    messageContact: 'Envoyer un Message',
    callContact: 'Appeler le Contact',
    noContacts: 'Aucun Contact Trouvé',

    // channels list
    profile: 'Profil',
    contacts: 'Contacts',
    topics: 'Sujets',
    subject: 'Titre (optionnel)',
    create: 'Créer',
    sealed: 'Protégé', 
    newTopic: 'Nouveau Sujet',
    new: 'Nouveau',

    // details
    topic: 'Sujet',
    host: 'Hôte',
    guest: 'Invité',
    leave: 'Partir',
    members: 'Membres',
    editSubject: 'Modifier le Title',
    topicMembers: 'Membres du Sujet',
    leaveTopic: 'Quitter le Sujet',
    deleteTopic: 'Supprimer le Sujet',
    blockTopic: 'Bloquer le Sujet',
    reportTopic: 'Signaler le Sujet',
    unknown: 'Inconnu',

    accounts: 'Comptes',
    createAccount: 'Créer un Compte',
    accessAccount: 'Accéder au Compte',
    token: 'Code',
    settings: 'Paramètres',
    federatedHost: 'Serveur Fédéré',
    storageLimit: 'Espace (Go) / Compte',
    keyType: 'Type de Clé',
    enableImage: 'Activer les Fichiers Image',
    enableAudio: 'Activer les Fichiers Audio',
    enableVideo: 'Activer les Fichiers Vidéo',
    enableCalls: 'Activer les Appels',
    relayUrl: 'URL de Relais',
    relayUsername: 'Nom d\'Utilisateur du Relais',
    relayPassword: 'Mot de Passe du Relais',

    newMessage: 'Nouveau Message',
    fontSize: 'Taille du Texte',
    small: 'Petit',
    medium: 'Moyen',
    large: 'Grand',
    fontColor: 'Couleur du Texte',
    selectedColor: 'Couleur Sélectionnée',

    login: 'Connexion',
    createAccount: 'Créer un Compte',
    forgotPassword: 'Mot de Passe Oublié',
    adminAccess: 'Accès Administrateur',
    server: 'Serveur',
    access: 'Accès',
    defaultPublic: 'Le serveur public par défaut est destiné à tester le système. Utilisez un serveur privé sinon.',
    confirmPassword: 'Confirmer le Mot de Passe',
    accountLogin: 'Connexion au Compte',
    accessAccount: 'Accéder au Compte',
    agree: 'J\'accepte les Conditions d\'Utilisation',
    terms: 'Afficher les Conditions d\'Utilisation',
    policy: 'Conditions d\'Utilisation et Politique d\'Utilisation',

    editMessage: 'Modifier le Texte du Message',
  },
  {
    languageCode: 'es',
    visibleRegistry: 'Visible en el Registro',
    edit: 'Editar',
    enableNotifications: 'Notificaciones Push',
    sealedTopics: 'Temas Protegidos',
    colorMode: 'Modo de Color',
    hourMode: 'Hora',
    dateMode: 'Fecha',
    language: 'Idioma',
    logout: 'Cerrar Sesión',
    changeLogin: 'Cambiar la contraseña',
    deleteAccount: 'Borrar Cuenta',
    contacts: 'Contactos',
    topics: 'Temas',
    messages: 'Mensajes',
    support: 'Ayuda',
    blocked: 'Oculto',
    account: 'Cuenta',
    display: 'Formato',
    messaging: 'Mensajería',
    timeFull: '24h',
    timeHalf: '12h',
    monthStart: 'mm/dd',
    monthEnd: 'dd/mm',
    error: 'Error',
    tryAgain: 'Inténtalo de nuevo.',

    sealUnset: 'Genere una clave para habilitar temas cifrados de un extremo a otro.',
    sealUnlocked: 'Al desactivar la clave de sellado se eliminará el acceso a todos los temas cifrados de extremo a extremo hasta que la clave se desbloquee nuevamente.',
    sealLocked: 'Desbloquee la clave de sellado para habilitar temas cifrados de extremo a extremo en este dispositivo.',
    sealDelete: 'Al eliminar la clave de sellado, se eliminará de forma permanente el acceso a cualquier tema cifrado de extremo a extremo existente para TODOS sus dispositivos.',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    generate: 'Generar',
    disable: 'Desactivar',
    delete: 'Borrar',
    unlock: 'Desbloquear',
    removeSeal: 'Borrar clave de seguridad',
    disableSeal: 'Desactivar clave de seguridad',
    unlockSeal: 'Desbloquear clave de seguridad',
    typeDelete: 'Escriba [borrar]',
    deleteKey: 'borrar',
    enableTopics: 'Habilitar temas seguros',
    manageTopics: 'Administrar clave de seguridad',
    changePassword: 'Cambiar la contraseña de la clave de seguridad.',
    update: 'Actualizar',
    changeKey: 'Cambiar clave Contraseña',
    delayMessage: 'La generación de claves puede tardar varios minutos.',
    changeMessage: 'Aquí puede cambiar el nombre de usuario y/o contraseña de su cuenta.',

    cancel: 'Cancelar',
    confirmLogout: 'Cerrar',
    loggingOut: 'Confirmando cierre de sesión',
    username: 'Nombre de Usuario',
    save: 'Guardar',
    notAvailable: 'Nombre de Usuario No Disponible',
    blockedContacts: 'Contactos Bloqueados',
    restoreContact: 'Restaurar Contacto?',
    blockedTopics: 'Temas bloqueados',
    restoreTopic: 'Restaurar Tema?',
    blockedMessages: 'Mensajes Bloqueados',
    restoreMessage: 'Restaurar Mensaje?',
    close: 'Cerrar',
    ok: 'OK',
    noBlockedContacts: 'No Hay Contactos Bloqueados',
    noBlockedTopics: 'No Hay Temas Bloqueados ',
    noBlockedMessages: 'No Hay Mensajes Bloqueados',
    restore: 'Restaurar',

    //profile page
    edit: 'Editar',
    name: 'Nombre',
    location: 'Ubicación',
    description: 'Descripción',
    registryVisible: 'Visible en el Registro',
    editImage: 'Editar Imagen',
    editDetails: 'Editar Detalles',

    // contacts page
    back: 'Atrás',
    deleteContact: 'Borrar Contacto',
    confirmDelete: 'Borrar',
    disconnectContact: 'Desconectar Contacto',
    confirmDisconnect: 'Desconectar',
    blockContact: 'Bloquear el Contacto',
    confirmBlock: 'Bloquear',
    reportContact: 'Reportar el Contacto',
    confirmReport: 'Reportar',
    confirmed: 'Guardado',
    pending: 'Desconocido',
    connecting: 'Conectando',
    connected: 'Conectado',
    requested: 'Solicitado',
    unsaved: 'No Guardado',
    offsync: 'Fuera de Sync',
    actionResync: 'Resinc',
    actionConnect: 'Conectar',
    actionAccept: 'Aceptar',
    actionSave: 'Guardar',
    actionCancel: 'Cancelar',
    actionDisconnect: 'Desconectar',
    actionIgnore: 'Ignorar',
    actionDelete: 'Borrar',
    actionBlock: 'Bloquear',
    actionReport: 'Reportar',

    // contact list page
    add: 'Agregar', 
    contactFilter: 'Contactos',
    serverFilter: 'Servidor',
    usernameFilter: 'Nombre de Usuario',
    viewProfile: 'Ver Perfil',
    messageContact: 'Enviar Mensaje',
    callContact: 'Llamar Contacto',
    noContacts: 'No Encontraron Contactos',

    // channels list
    profile: 'Perfil',
    contacts: 'Contactos',
    topics: 'Temas',
    subject: 'Título (opcional)',
    create: 'Crear',
    sealed: 'Protegida',
    newTopic: 'Nuevo Tema',
    new: 'Nuevo',

    // details
    topic: 'Tema',
    host: 'Anfitrión',
    guest: 'Invitado',
    leave: 'Dejar',
    members: 'Miembros',
    editSubject: 'Editar Título',
    topicMembers: 'Miembros del Tema',
    leaveTopic: 'Dejar el Tema',
    deleteTopic: 'Borrar el Tema',
    blockTopic: 'Bloquer el Tema',
    reportTopic: 'Reportar el Tema',
    unknown: 'Desconocido',

    accounts: 'Cuentas',
    createAccount: 'Crear',
    accessAccount: 'Acceso',
    token: 'Código',
    settings: 'Ajustes',
    federatedHost: 'Servidor Federado',
    storageLimit: 'Espacio (GB) / Cuenta',
    keyType: 'Tipo de Clave',
    enableImage: 'Permitir Archivos de Imagen',
    enableAudio: 'Permitir Archivos de Audio',
    enableVideo: 'Permitir Archivos de Vídeo',
    enableCalls: 'Permitier Llamadas',
    relayUrl: 'URL para Llamadas',
    relayUsername: 'Nombre de Usuario para Llamadas',
    relayPassword: 'Contraseña para Llamadas',

    newMessage: 'Nuevo Mensaje',
    fontSize: 'Tamano del Texto',
    small: 'Pequeño',
    medium: 'Medio',
    large: 'Grande',
    fontColor: 'Color de Texto',
    selectedColor: 'Color Seleccionado',

    login: 'Iniciar sesión',
    createAccount: 'Crear cuenta',
    forgotPassword: 'Olvidé mi contraseña',
    adminAccess: 'Acceso de administrador',
    server: 'Servidor',
    access: 'Acceso',
    defaultPublic: 'El servidor público predeterminado es para probar el sistema. Utilice un servidor privado en caso contrario.',
    confirmPassword: 'Confirmar contraseña',
    accountLogin: 'Iniciar sesión en la cuenta',
    accessAccount: 'Acceder a la cuenta',
    agree: 'Acepto los Términos de Servicio',
    terms: 'Ver Términos de Servicio',
    policy: 'Términos de Uso y Política de Usuario',

    editMessage: 'Editar Texto del Mensaje',
  },
  {
    languageCode: 'de',
    visibleRegistry: 'Sichtbar in der Registrierung',
    edit: 'Bearbeiten',
    enableNotifications: 'Mitteilungen',
    sealedTopics: 'Gesicherte Themen',
    colorMode: 'Farmodus',
    hourMode: 'Stunde',
    dateMode: 'Datum',
    language: 'Sprache',
    logout: 'Ausloggen',
    changeLogin: 'Kennwort Aktualisieren',
    deleteAccount: 'Konto Löschen',
    contacts: 'Kontakte',
    topics: 'Themen',
    messages: 'Mitteilungen',
    support: 'Helfen',
    blocked: 'Versteckt',
    account: 'Konto',
    display: 'Format',
    messages: 'Nachrichtenübermittlung',
    timeFull: '24h',
    timeHalf: '12h',
    monthStart: 'mm/dd',
    monthEnd: 'dd/mm',
    error: 'Fehler',
    tryAgain: 'Bitte versuche es erneut.',

    sealUnset: 'Generieren Sie einen Schlüssel, um Ende-zu-Ende-verschlüsselte Themen zu ermöglichen.',
    sealUnlocked: 'Durch das Deaktivieren des Versiegelungsschlüssels wird der Zugriff auf alle Ende-zu-Ende-verschlüsselten Themen entfernt, bis der Schlüssel wieder entsperrt wird.',
    sealLocked: 'Entsperren Sie den Versiegelungsschlüssel, um Ende-zu-Ende-verschlüsselte Themen auf diesem Gerät zu aktivieren.',
    sealDelete: 'Durch das Löschen des Siegelschlüssels wird der Zugriff auf alle vorhandenen Ende-zu-Ende-verschlüsselten Themen für ALLE Ihre Geräte dauerhaft entfernt.',
    password: 'Passwort',
    confirmPassword: 'Bestätige das Passwort',
    generate: 'Generieren',
    disable: 'Deaktivieren',
    delete: 'Löschen',
    unlock: 'Freischalten',
    removeSeal: 'Sicherheitsschlüssel entfernen',
    disableSeal: 'Sicherheitsschlüssel deaktivieren',
    unlockSeal: 'Sicherheitsschlüssel entsperren',
    typeDelete: 'Geben Sie [löschen]',
    deleteKey: 'löschen',
    enableTopics: 'Aktivieren Sie gesicherte Themen',
    manageTopics: 'Sicherheitsschlüssel verwalten',
    changePassword: 'Ändern Sie das Passwort des Sicherheitsschlüssels',
    update: 'Aktualisieren',
    changeKey: 'Schlüsselpasswort ändern',
    delayMessage: 'Die Schlüsselgenerierung kann mehrere Minuten dauern.',
    changeMessage: 'Hier können Sie den Benutzernamen und/oder das Passwort für Ihr Konto ändern.',

    cancel: 'Stornieren',
    confirmlogout: 'Ausloggen',
    loggingOut: 'Abmelden bestätigen',
    username: 'Nutzername',
    save: 'Speichern',
    notAvailable: 'Benutzername Nicht Verfügbar',
    blockedContacts: 'Blockierte Kontakte',
    restoreContact: 'Kontakt Wiederherstellen?',
    blockedTopics: 'Blockierte Themen',
    restoreTopic: 'Thema Wiederherstellen?',
    blockedMessages: 'Blockierte Nachrichten',
    restoreMessage: 'Nachricht Wiederherstellen?',
    close: 'Schließen',
    ok: 'OK',
    noBlockedContacts: 'Keine Blockierten Kontakte',
    noBlockedTopics: 'Keine Blockierten Themen',
    noBlockedMessages: 'Keine Blockierten Nachrichten',
    restore: 'Wiederherstellen',

    //profile page
    edit: 'Bearbeiten',
    name: 'Name',
    location: 'Standort',
    description: 'Beschreibung',
    registryVisible: 'Sichtbar in der Registrierung',
    editImage: 'Bild Bearbeiten',
    editDetails: 'Details Bearbeiten',
    
    //contacts page
    back: 'Rückwärts',
    deleteContact: 'Kontakt Löschen',
    confirmDelete: 'Löschen',
    disconnectContact: 'Kontakt Trennen',
    confirmDisconnect: 'Trennen',
    blockContact: 'Kontakt Ausblenden',
    confirmBlock: 'Verstecken',
    reportContact: 'Kontakt Melden',
    confirmReport: 'Bericht',
    confirmed: 'Gerettet',
    pending: 'Unbekannt',
    connecting: 'Verbinden',
    connected: 'Beigetreten',
    requested: 'Angefordert',
    unsaved: 'Nicht Gespeichert',
    offsync: 'Nicht Sync',
    actionResync: 'Neu Sync',
    actionConnect: 'Verbinden',
    actionAccept: 'Akzeptieren',
    actionSave: 'Speichern',
    actionCancel: 'Stornieren',
    actionDisconnect: 'Trennen',
    actionIgnore: 'Ignorieren',
    actionDelete: 'Löschen',
    actionBlock: 'Verstecken',
    actionReport: 'Bericht',

    // contact list page
    add: 'Hinzufügen',
    contactFilter: 'Kontakte',
    serverFilter: 'Server',
    usernameFilter: 'Benutzername',
    viewProfile: 'Profil Anzeigen',
    messageContact: 'Nachricht Senden',
    callContact: 'Kontakt Anrufen',
    noContacts: 'Keine Kontakte Gefunden',
    
    // channels list
    profile: 'Profil',
    contacts: 'Kontakte',
    topics: 'Themen',
    subject: 'Titel (optional)',
    create: 'Erstellen',
    sealed: 'Gesichert',
    newTopic: 'Neues Thema',
    new: 'Neu',

    // details
    topic: 'Thema',
    host: 'Gastgeber',
    guest: 'Gast',
    leave: 'Verlassen',
    members: 'Mitglieder',
    editSubject: 'Titel bearbeiten',
    topicMembers: 'Themenmitglieder',
    leaveTopic: 'Verlasse das Thema',
    deleteTopic: 'Das Thema Löschen',
    blockTopic: 'Blockiere das Thema',
    reportTopic: 'Das Thema Melden',
    unknown: 'Unbekannt',

    accounts: 'Konten',
    createAccount: 'Erstellen',
    accessAccount: 'Zugang',
    token: 'Code',
    settings: 'Einstellungen',
    federatedHost: 'Verbundname',
    storageLimit: 'Raum (GB) / Konto',
    keyType: 'Schlüsselart',
    enableImage: 'Bilddateien Aktivieren',
    enableAudio: 'Audiodateien Aktivieren',
    enableVideo: 'Videodateien aktivieren',
    enableCalls: 'Anrufe Ermöglichen',
    relayUrl: 'URL für Anrufe',
    relayUsername: 'Benutzername für Anrufe',
    relayPassword: 'Passwort für Anrufe',

    newMessage: 'Neue Nachricht',
    fontSize: 'Textgröße',
    small: 'Klein',
    medium: 'Mittel',
    large: 'Groß',
    fontColor: 'Textfarbe',
    selectedColor: 'Ausgewählte Farbe',

    login: 'Anmelden',
    createAccount: 'Konto erstellen',
    forgotPassword: 'Passwort vergessen',
    adminAccess: 'Administratorzugang',
    server: 'Server',
    access: 'Zugang',
    defaultPublic: 'Der Standard-Public-Server dient dazu, das System zu testen. Verwenden Sie andernfalls einen privaten Server.',
    confirmPassword: 'Passwort bestätigen',
    accountLogin: 'Kontoanmeldung',
    accessAccount: 'Zugang zum Konto',
    agree: 'Ich akzeptiere die Nutzungsbedingungen',
    terms: 'Nutzungsbedingungen anzeigen',
    policy: 'Nutzungsbedingungen und Benutzerrichtlinien',

    editMessage: 'Nachrichtentext Bearbeiten',
  },
  {
    languageCode: 'pt',
    visibleRegistry: 'Visível no Registro',
    edit: 'Editar',
    enableNotifications: 'Notificações Push',
    sealedTopics: 'Tópicos Selados',
    colorMode: 'Modo de Cor',
    hourMode: 'Hora',
    dateMode: 'Data',
    language: 'Idioma',
    logout: 'Sair',
    changeLogin: 'Alterar Credenciais',
    deleteAccount: 'Excluir Conta',
    contacts: 'Contatos',
    topics: 'Tópicos',
    messages: 'Mensagens',
    support: 'Suporte',
    blocked: 'Bloqueados',
    account: 'Conta',
    display: 'Formato',
    messaging: 'Mensagens',
    timeFull: '24h',
    timeHalf: '12h',
    monthStart: 'mm/dd',
    monthEnd: 'dd/mm',
    error: 'Erro',
    tryAgain: 'Por favor, tente novamente.',
    sealUnset: 'Gerar uma chave para habilitar tópicos com criptografia de ponta a ponta.',
    sealUnlocked: 'Desabilitar a chave de selagem bloqueará o acesso a todos os tópicos com criptografia de ponta a ponta deste dispositivo até que a chave seja desbloqueada novamente.',
    sealLocked: 'Desbloqueie a chave de selagem para suportar tópicos com criptografia de ponta a ponta neste dispositivo.',
    sealDelete: 'Excluir a chave de selagem removerá permanentemente o acesso a todos os tópicos com criptografia de ponta a ponta existentes para TODOS os seus dispositivos.',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    generate: 'Gerar',
    disable: 'Desabilitar',
    delete: 'Excluir',
    unlock: 'Desbloquear',
    removeSeal: 'Remover Chave de Selagem',
    disableSeal: 'Desabilitar Chave de Selagem',
    unlockSeal: 'Desbloquear Chave de Selagem',
    typeDelete: 'Digite [excluir]',
    deleteKey: 'excluir',
    enableTopics: 'Habilitar Tópicos Selados',
    manageTopics: 'Gerenciar Chave de Selagem',
    changePassword: 'Alterar senha da chave de selagem.',
    update: 'Alterar',
    changeKey: 'Alterar Senha da Chave',
    delayMessage: 'A geração da chave pode levar vários minutos.',
    changeMessage: 'Aqui você pode alterar o nome de usuário e/ou senha da sua conta.',
    cancel: 'Cancelar',
    confirmLogout: 'Sair',
    loggingOut: 'Saindo',
    username: 'Nome de Usuário',
    save: 'Salvar',
    notAvailable: 'Nome de Usuário Indisponível',
    blockedContacts: 'Contatos Bloqueados',
    restoreContact: 'Restaurar Contato?',
    blockedTopics: 'Tópicos Bloqueados',
    restoreTopic: 'Restaurar Tópico?',
    blockedMessages: 'Mensagens Bloqueadas',
    restoreMessage: 'Restaurar Mensagem?',
    close: 'Fechar',
    ok: 'OK',
    noBlockedContacts: 'Nenhum Contato Bloqueado',
    noBlockedTopics: 'Nenhum Tópico Bloqueado',
    noBlockedMessages: 'Nenhuma Mensagem Bloqueada',
    restore: 'Restaurar',
    edit: 'Editar',
    name: 'Nome',
    location: 'Localização',
    description: 'Descrição',
    registryVisible: 'Visível no Registro',
    editImage: 'Editar Imagem',
    editDetails: 'Editar Detalhes',
    back: 'Voltar',
    deleteContact: 'Excluir Contato',
    confirmDelete: 'Excluir',
    disconnectContact: 'Desconectar do Contato',
    confirmDisconnect: 'Desconectar',
    blockContact: 'Bloquear Contato',
    confirmBlock: 'Bloquear',
    reportContact: 'Denunciar Contato',
    confirmReport: 'Denunciar',
    confirmed: 'Salvo',
    pending: 'Desconhecido',
    connecting: 'Solicitação Enviada',
    connected: 'Conectado',
    requested: 'Solicitação Recebida',
    unsaved: 'Não Salvo',
    offsync: 'Desligado',
    actionResync: 'Resincronizar',
    actionConnect: 'Conectar',
    actionAccept: 'Aceitar',
    actionSave: 'Salvar',
    actionCancel: 'Cancelar',
    actionDisconnect: 'Desconectar',
    actionIgnore: 'Ignorar',
    actionDelete: 'Excluir',
    actionBlock: 'Bloquear',
    actionReport: 'Denunciar',
    actionLeave: 'Sair',
    add: 'Adicionar',
    contactFilter: 'Contatos',
    serverFilter: 'Servidor',
    usernameFilter: 'Nome de Usuário',
    viewProfile: 'Ver Perfil',
    messageContact: 'Enviar Mensagem',
    callContact: 'Chamar Contato',
    noContacts: 'Nenhum Contato Encontrado',
    profile: 'Perfil',
    contacts: 'Contatos',
    topics: 'Tópicos',
    subject: 'Assunto (opcional)',
    create: 'Criar',
    sealed: 'Selado',
    newTopic: 'Novo Tópico',
    new: 'Novo',
    topic: 'Tópico',
    host: 'Anfitrião',
    guest: 'Convidado',
    leave: 'Sair',
    members: 'Membros',
    editSubject: 'Editar Assunto',
    topicMembers: 'Membros do Tópico',
    leaveTopic: 'Sair do Tópico',
    deleteTopic: 'Excluir Tópico',
    blockTopic: 'Bloquear Tópico',
    reportTopic: 'Denunciar Tópico',
    unknown: 'Desconhecido',
    accounts: 'Contas',
    createAccount: 'Criar Conta',
    accessAccount: 'Acessar Conta',
    token: 'Token',
    settings: 'Configurações',
    federatedHost: 'Anfitrião Federado',
    storageLimit: 'Limite de Armazenamento (GB) / Conta',
    keyType: 'Tipo de Chave de Conta',
    enableImage: 'Habilitar Fila de Imagens',
    enableAudio: 'Habilitar Fila de Áudio',
    enableVideo: 'Habilitar Fila de Vídeo',
    enableCalls: 'Habilitar Chamadas WebRTC',
    relayUrl: 'URL do Relay',
    relayUsername: 'Nome de Usuário do Relay',
    relayPassword: 'Senha do Relay',
    newMessage: 'Nova Mensagem',
    fontSize: 'Tamanho da Fonte',
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande',
    fontColor: 'Cor da Fonte',
    selectedColor: 'Cor Selecionada',
    login: 'Login',
    createAccount: 'Criar Conta',
    forgotPassword: 'Esqueci a Senha',
    adminAccess: 'Acesso de Administrador',
    server: 'Servidor',
    access: 'Acesso',
    defaultPublic: 'O servidor público padrão serve para testar o sistema. Use um servidor privado, caso contrário.',
    confirmPassword: 'Confirmar Senha',
    accountLogin: 'Login da Conta',
    accessAccount: 'Acessar Conta',
    agree: 'Eu concordo com os Termos de Serviço',
    terms: 'Ver Termos de Serviço',
    policy: 'Termos de Uso e Política do Usuário',
    editMessage: 'Editar Texto da Mensagem',
  },
];

export function getLanguageStrings() {
  const locale = Platform.OS === 'ios' ? NativeModules.SettingsManager?.settings.AppleLocale || NativeModules.SettingsManager?.settings.AppleLanguages[0] : NativeModules.I18nManager?.localeIdentifier;

  const lang = locale?.slice(0, 2) || '';

  if (lang === 'en') {
    return Strings[0];
  }
  if (lang === 'fr') {
    return Strings[1];
  }
  if (lang === 'es') {
    return Strings[2];
  }
  if (lang === 'de') {
    return Strings[3];
  }
  if (lang === 'pt') {
    return Strings[4];
  }
  return Strings[0];
};
