import type { Messages } from "./index";

/**
 * Textes en français (ToDo 15.1) – **traduction automatique**, vérifiée
 * plusieurs fois de façon automatique, pas par des locuteurs natifs (D-08 et
 * 15.6 dans `Erledigt.md`). Mêmes clés que `de.ts` ; le type garantit qu'aucune
 * ne manque et `i18n.test.ts` vérifie que les marqueurs correspondent.
 *
 * Ne figurent pas ici : les mentions légales et la politique de
 * confidentialité restent en allemand (liste d'exceptions de D-08), pas plus
 * que les noms de rues ni les données. L'avertissement de non-responsabilité
 * est présent (`disclaimer.*`).
 *
 * Les guillemets sont typographiques (« … », “…”) à dessein : les guillemets
 * ASCII fermeraient la chaîne.
 */
export const fr: Messages = {
  "theme.group": "Affichage",
  "theme.dark": "Sombre",
  "theme.light": "Clair",
  "theme.system": "Système",

  "offline.notice": "Pas de réseau – les dernières données chargées sont affichées.",

  "restriction.nowApplies": "La restriction s'applique en ce moment",

  "share.title": "Place PMR {name}",
  "share.text": "Place de stationnement PMR : {name}",
  "share.textCount": "Place de stationnement PMR : {name} ({count} places)",
  "share.copied": "Lien copié",
  "share.copyFailed": "Copie impossible",
  "share.share": "Partager la place",
  "share.copy": "Copier le lien",

  "legend.target": "Destination de la barre de navigation",
  "legend.targetNote": "affichée plus grande – la plus proche ou celle que vous avez choisie",
  "legend.others": "Autres places proposées",
  "legend.othersNote": "visibles uniquement tant que la sélection est ouverte",
  "legend.exact": "Place, position exacte",
  "legend.exactNote": "coordonnées issues de la source",
  "legend.approx": "Place, position approximative",
  "legend.approxNote": "se trouve dans cette rue, l'emplacement exact peut différer",
  "legend.title": "Signification des couleurs",
  "legend.clusters":
    "Les cercles avec un nombre regroupent plusieurs places – zoomez pour les voir une à une.",
  "legend.close": "Fermer la légende",
  "legend.open": "Légende des couleurs de la carte",

  "list.spacesOne": "{count} place",
  "list.spacesMany": "{count} places",
  "list.nearby": "Places à proximité",
  "list.nearest": "Places les plus proches",
  "list.noLocation":
    "Sans autorisation de localisation, la distance est calculée à partir du centre-ville.",
  "list.showDetails": "Afficher les détails",
  "list.unlocated": "Sans position précise ({count})",
  "list.unlocatedNote":
    "Pour ces places, la source n'indique aucune adresse pouvant être localisée avec certitude. Elles n'apparaissent donc pas sur la carte.",
  "list.sources": "D'où viennent les données",
  "list.officialOne": "{count} ville fournit une liste officielle ({spaces} places).",
  "list.officialMany": "{count} villes fournissent une liste officielle ({spaces} places).",
  "list.crowdsourcedOne":
    "Pour {count} autre ville il n'y en a pas, les données proviennent d'OpenStreetMap.",
  "list.crowdsourcedMany":
    "Pour {count} autres villes il n'y en a pas, les données proviennent d'OpenStreetMap.",
  "list.osmCredit":
    "Affichage de la carte et la plupart des données de stationnement : {link}, Open Database License (ODbL). Les sources officielles sont indiquées ci-dessous pour chaque ville.",
  "list.osmLink": "© contributeurs d'OpenStreetMap",
  "list.bkgCredit": "Noms et codes des communes : © {bkg} (2026) {license}.",
  "list.osmNote":
    "Les données OpenStreetMap montrent surtout des parkings avec des places PMR signalées plutôt que des places isolées au bord de la rue, et elles sont incomplètes – une entrée manquante ne signifie pas qu'il n'y a pas de place PMR.",
  "list.allCities": "Les {count} villes avec leur source",
  "list.cityFilter": "Rechercher une ville",
  "list.cityShown": "{shown} sur {count} affichées : saisissez un nom pour en trouver d'autres.",
  "list.cityNone": "Aucune ville trouvée.",
  "list.cityCounts": " : {spots} emplacements, {spaces} places",
  "list.source": "Source : {source}",
  "list.licenseMissing": " · licence non indiquée",
  "list.dataFrom": "Données du {date}",

  "details.city": "Ville",
  "details.district": "Quartier",
  "details.close": "Fermer les détails",
  "details.note": "Remarque",
  "details.spaces": "Places",
  "details.maxStay": "Durée maximale de stationnement",
  "details.only": "Uniquement",
  "details.distance": "Distance",
  "details.noLocation": "Position non autorisée",
  "details.restrictionOff":
    "La restriction {strong} – la place est utilisable librement en ce moment.",
  "details.restrictionOffStrong": "ne s'applique pas actuellement",
  "details.restrictionOn": "La restriction s'applique {strong}.",
  "details.restrictionOnStrong": "actuellement",
  "details.confirmed":
    "{strong} – l'administration de la ville et OpenStreetMap indiquent cette place au même endroit.",
  "details.confirmedStrong": "Confirmé par deux sources",
  "details.osmOnly":
    "{strong} – la liste officielle de la ville ne comporte pas cet emplacement. Il peut être nouveau ou y manquer ; l’information n’est pas vérifiée, vérifiez sur place.",
  "details.osmOnlyStrong": "Uniquement dans OpenStreetMap",
  "details.approx":
    "La position n'est connue qu'approximativement – la place se trouve dans cette rue, l'emplacement exact peut différer.",
  "details.source": "Source : {source}",

  "maps.auto": "Automatique (selon l'appareil)",
  "maps.google.open": "Ouvrir dans Google Maps",
  "maps.google.short": "Google Maps",
  "maps.apple.open": "Ouvrir dans Plans d'Apple",
  "maps.apple.short": "Plans d'Apple",
  "maps.osm.open": "Ouvrir dans OpenStreetMap",
  "maps.osm.short": "OpenStreetMap",
  "maps.here.open": "Ouvrir dans HERE WeGo",
  "maps.here.short": "HERE WeGo",
  "maps.waze.open": "Ouvrir dans Waze",
  "maps.waze.short": "Waze",
  "maps.geo.open": "Ouvrir dans l'application de cartes par défaut",
  "maps.geo.short": "App par défaut",
  "maps.google.navigate": "Navigation : ouvrir Google Maps",
  "maps.apple.navigate": "Navigation : ouvrir Plans d'Apple",
  "maps.osm.navigate": "Navigation : ouvrir OpenStreetMap",
  "maps.here.navigate": "Navigation : ouvrir HERE WeGo",
  "maps.waze.navigate": "Navigation : ouvrir Waze",
  "maps.geo.navigate": "Navigation : ouvrir l'application de cartes par défaut",
  "maps.fallback.navigate": "Navigation : ouvrir l'application de cartes",
  "maps.fallback.open": "Ouvrir dans l'application de cartes",
  "maps.fallback.short": "App de cartes",

  "settings.appearance": "Affichage",
  "settings.appearanceNote":
    "Le mode sombre est le réglage par défaut – l'application est souvent utilisée en voiture et dans l'obscurité.",
  "settings.language": "Langue",
  "settings.languageNote":
    "La langue de votre navigateur est proposée en premier. Avec un compte, le choix vaut sur tous vos appareils.",
  "settings.languageChoose": "Choisir la langue",
  "settings.languageUnreviewed":
    "Les traductions sont produites automatiquement et vérifiées plusieurs fois de façon automatique, pas par des locuteurs natifs. La version allemande fait foi ; sur place, la signalisation prévaut toujours.",
  "settings.mapsApp": "Application de cartes pour la navigation",
  "settings.mapsAppNote":
    "Avec quoi « Démarrer la navigation » s'ouvre. Sans choix de votre part, cela dépend de l'appareil – ici ce serait {detected}.",
  "settings.mapsAppChoose": "Choisir l'application de cartes",
  "settings.mapsAppDeviceOnly": "Le choix ne vaut que sur cet appareil – même avec un compte.",
  "offline.heading": "Hors réseau : emporter les places",
  "offline.note":
    "Charge les données de stationnement d'une ville sur cet appareil afin qu'elles soient complètes même dans un parking couvert ou une zone sans réseau. Les images de la carte n'en font pas partie – sans réseau, la carte reste grise, mais les repères et la liste fonctionnent.",
  "offline.cityLabel": "Ville",
  "offline.download": "Charger à l'avance",
  "offline.downloading": "Chargement …",
  "offline.refresh": "Actualiser",
  "offline.remove": "Supprimer",
  "offline.removeLabel": "Supprimer {name} de l'appareil",
  "offline.refreshLabel": "Actualiser {name}",
  "offline.saved": "{name} est maintenant enregistrée sur cet appareil.",
  "offline.removed": "{name} a été supprimée de l'appareil.",
  "offline.failed": "Le chargement a échoué. Veuillez réessayer avec du réseau.",
  "offline.unsupported": "Ce navigateur ne peut pas stocker de données pour une utilisation hors réseau.",
  "offline.none": "Aucune ville n'est encore enregistrée sur cet appareil.",
  "offline.listLabel": "Enregistrées sur cet appareil",
  "offline.entry": "{count} emplacements, {size} utilisés",
  "offline.dataDate": "Date des données : {date}",
  "offline.savedDate": "Chargé le {date}",
  "offline.staleData":
    "Les données ont plus de six mois. Les places ont pu changer – veuillez vérifier sur place.",
  "offline.staleCopy": "La copie a plus d'un mois. Veuillez l'actualiser avec du réseau.",
  "offline.total": "Espace total utilisé : {size}",
  "settings.feedback": "Signaler une erreur ou envoyer une suggestion",
  "settings.feedbackNote":
    "Quelque chose ne va pas ? Une place manque ou n'existe plus ? Les retours sont la seule source qui remarque de tels changements. Si vous le souhaitez, vous pouvez indiquer une adresse e-mail – nous vous répondrons.",
  "settings.account": "Compte",
  "settings.accountNote":
    "Facultatif. L'application fonctionne entièrement sans compte – y compris pour signaler des erreurs. Un compte retient seulement que vos retours vont ensemble.",
  "settings.legal": "Mentions légales",
  "settings.imprint": "Mentions légales (Impressum)",
  "settings.privacy": "Politique de confidentialité",
  "settings.sources": "Sources et licences",
  "settings.coverage": "Couverture des données",

  "account.emailInvalid": "Cette adresse e-mail ne semble pas correcte.",
  "account.passwordTooShort": "Le mot de passe doit comporter au moins {min} caractères.",
  "account.failed": "Cela n'a pas fonctionné. Veuillez réessayer plus tard.",
  "account.offline": "Pas de connexion. Veuillez réessayer plus tard.",
  "account.logoutFailed": "La déconnexion a échoué – pas de connexion.",
  "account.signedInAs": "Connecté en tant que {email}",
  "account.admin": "Administrateur",
  "account.storedData":
    "Votre compte ne conserve que l'adresse e-mail et le mot de passe chiffré. Votre position n'est toujours pas enregistrée – même avec un compte.",
  "account.logout": "Se déconnecter",
  "account.changePassword": "Changer le mot de passe",
  "account.oldPassword": "Mot de passe actuel",
  "account.newPassword": "Nouveau mot de passe",
  "account.changePasswordNote":
    "Tous les autres appareils sur lesquels vous êtes connecté seront déconnectés. Cet appareil reste connecté.",
  "account.passwordChanged": "Mot de passe modifié. Toutes les autres sessions sont terminées.",
  "account.cancel": "Annuler",
  "account.export": "Télécharger mes données",
  "account.exportNote":
    "Un fichier JSON avec tout ce qui est enregistré pour votre compte : adresse e-mail, date de création, évaluations, places enregistrées, vos retours ainsi que le choix de l'application de cartes et de la langue.",
  "myRatings.open": "Mes évaluations",
  "myRatings.close": "Masquer mes évaluations",
  "myRatings.intro":
    "Vos votes, le plus récent en premier. Retirer un vote le supprime du décompte.",
  "myRatings.none": "Vous n'avez encore évalué aucune place.",
  "myRatings.loading": "Chargement …",
  "myRatings.loadFailed": "Vos évaluations n'ont pas pu être chargées.",
  "myRatings.date": "le {date}",
  "myRatings.notInStock": "Plus dans la base",
  "myRatings.notInStockNote":
    "N'était plus incluse lors du dernier import. Vous pouvez tout de même retirer votre vote.",
  "myRatings.showOnMap": "Afficher sur la carte",
  "myRatings.withdraw": "Retirer",
  "myRatings.withdrawLabel": "Retirer le vote pour {name}",
  "myRatings.withdrawFailed": "Le vote n'a pas pu être retiré.",
  "myRatings.showLabel": "Afficher {name} sur la carte",
  "favorite.save": "Enregistrer la place",
  "favorite.saved": "Enregistrée – retirer",
  "favorite.needAccount": "Pour enregistrer, il faut un compte (Paramètres).",
  "favorite.failed": "La place n'a pas pu être enregistrée.",
  "favorite.removeFailed": "La place n'a pas pu être retirée.",
  "favorite.offline": "Pas de réseau – la modification n'a pas été enregistrée.",
  "myFavorites.open": "Places enregistrées",
  "myFavorites.close": "Masquer les places enregistrées",
  "myFavorites.intro":
    "Les places que vous avez mémorisées, la dernière enregistrée en premier. La distance est à vol d'oiseau depuis votre position.",
  "myFavorites.none":
    "Rien d'enregistré pour l'instant. Dans la vue détaillée d'une place, vous trouverez le bouton « Enregistrer la place ».",
  "myFavorites.loadFailed": "Vos places enregistrées n'ont pas pu être chargées.",
  "myFavorites.distance": "à {distance}",
  "myFavorites.notInStock": "Plus dans la base",
  "myFavorites.notInStockNote":
    "N'était plus incluse lors du dernier import. Vous pouvez supprimer l'entrée.",
  "myFavorites.showOnMap": "Afficher sur la carte",
  "myFavorites.showLabel": "Afficher {name} sur la carte",
  "myFavorites.remove": "Retirer",
  "myFavorites.removeLabel": "Retirer {name} des places enregistrées",
  "account.delete": "Supprimer le compte",
  "account.deleteWarning":
    "Le compte, toutes les sessions et vos évaluations seront supprimés. Vos retours sont conservés comme signalements, mais perdent le lien avec vous ; une adresse de réponse indiquée est supprimée. Cette action est irréversible.",
  "account.deletePassword": "Votre mot de passe pour confirmer",
  "account.deleteConfirm": "Supprimer définitivement le compte",
  "account.modeGroup": "Se connecter ou créer un compte",
  "account.login": "Se connecter",
  "account.register": "Créer un compte",
  "account.email": "Adresse e-mail",
  "account.password": "Mot de passe",
  "account.passwordHelp":
    "Au moins {min} caractères. La longueur compte plus que les caractères spéciaux – une phrase facile à retenir vaut mieux que {example}.",
  "account.forgotNote":
    "Un mot de passe oublié ne peut pas encore être réinitialisé soi-même – il n'y a pas encore d'envoi d'e-mails. Un compte n'est de toute façon pas nécessaire pour utiliser l'application.",

  "feedback.reportSpot": "Signaler une erreur pour cette place",
  "feedback.reportOrSuggest": "Signaler une erreur ou envoyer une suggestion",
  "feedback.title": "Retour",
  "feedback.close": "Fermer le retour",
  "feedback.intro":
    "Les retours sont la seule source qui remarque quand une place n'existe plus ou se trouve au mauvais endroit.",
  "feedback.kind.fehler": "Signaler une erreur",
  "feedback.kind.vorschlag": "Suggestion d'amélioration",
  "feedback.contactHint":
    "Nous ne pouvons vous répondre qu'avec une adresse – pour des questions ou lorsque l'erreur est corrigée. Sans adresse, votre signalement aide quand même, mais vous n'aurez pas de nouvelles de notre part.",
  "feedback.contactPrivacy":
    "L'adresse n'est utilisée que pour répondre à ce signalement, n'est pas transmise et est supprimée avec le signalement – au plus tard après deux ans.",
  "feedback.errorKind": "Veuillez choisir de quoi il s'agit.",
  "feedback.errorMessageShort": "Veuillez décrire en quelques mots ce qui ne va pas.",
  "feedback.errorMessageLong": "Veuillez raccourcir – {max} caractères au maximum.",
  "feedback.errorEmail":
    "Cette adresse e-mail ne semble pas correcte. Laissez sinon simplement le champ vide.",
  "feedback.offline":
    "Pas de connexion. Le signalement n'a pas été envoyé – veuillez réessayer plus tard.",
  "feedback.thanks": "Merci – le signalement est bien arrivé.",
  "feedback.willReply":
    "Nous l'examinons et vous répondons par e-mail s'il y a quelque chose à dire.",
  "feedback.noReply":
    "Vous n'avez pas indiqué d'adresse, vous ne recevrez donc pas de réponse – votre signalement aide quand même.",
  "feedback.again": "Signaler autre chose",
  "feedback.done": "Terminé",
  "feedback.whatAbout": "De quoi s'agit-il ?",
  "feedback.kindGroup": "Type de retour",
  "feedback.reportAbout": "Signalement concernant :",
  "feedback.yourSuggestion": "Votre suggestion",
  "feedback.whatIsWrong": "Qu'est-ce qui ne va pas ?",
  "feedback.placeholderSuggestion": "Par exemple : le choix du rayon pourrait proposer 2 km.",
  "feedback.placeholderError":
    "Par exemple : la place du 4 Bahnhofstraße est supprimée, il y a maintenant une borne de recharge.",
  "feedback.charsLeft": "Encore {count} caractères possibles.",
  "feedback.optional": "(facultatif)",
  "feedback.emailPlaceholder": "nom@example.com",
  "feedback.fromAccount": "Repris de votre compte.",
  "feedback.sending": "Envoi en cours …",
  "feedback.submit": "Envoyer",
  "feedback.cancel": "Annuler",

  "rating.saveFailed": "L'évaluation n'a pas pu être enregistrée.",
  "rating.offline": "Pas de réseau – l'évaluation n'a pas été enregistrée.",
  "rating.question": "Cette place existe-t-elle encore ?",
  "rating.exists": "Existe",
  "rating.gone": "N'existe plus",
  "rating.lastConfirmed": "Dernière confirmation :",
  "rating.lastGone": "Dernier signalement de suppression :",
  "rating.needAccount":
    "Pour évaluer, il faut un compte – sous « Paramètres → Compte ». Vous pouvez consulter les informations sans compte.",
  "rating.voted":
    "Vous avez évalué. Appuyer à nouveau annule, l'autre bouton inverse le vote.",
  "rating.votes": "{label}, {count} votes",

  "admin.unauthorized": "Non connecté ou sans autorisation.",
  "admin.noConnection": "Pas de connexion.",
  "admin.reload": "Recharger",
  "admin.loading": "Chargement …",

  "reported.loadFailed": "La liste de contrôle n'a pas pu être chargée.",
  "reported.spotGone": "La place {id} n'existe plus dans la base.",
  "reported.title": "Signalé : « n'existe plus »",
  "reported.introOne":
    "Places avec au moins {count} signalement de comptes différents. Les évaluations ne modifient pas les données – c'est une liste à vérifier.",
  "reported.introMany":
    "Places avec au moins {count} signalements de comptes différents. Les évaluations ne modifient pas les données – c'est une liste à vérifier.",
  "reported.minimum": "À partir de combien de signalements",
  "reported.minimumAll": "1 (tous)",
  "reported.none": "Aucune place n'est signalée aussi souvent. C'est la bonne nouvelle.",
  "reported.goneCount": "{count}× supprimée",
  "reported.existsCount": "{count}× confirmée",
  "reported.reasonLabel": "Raison",
  "reported.reason.lastThreeGone":
    "Les trois derniers votes : supprimée – même si des confirmations plus anciennes dominent.",
  "reported.reason.reports": "{count} comptes l'ont signalée comme supprimée.",
  "reported.weighted": "Pondéré : {gone} supprimée · {exists} confirmée",
  "reported.weightedHint":
    "Pondéré signifie : les votes plus anciens comptent moins (un quart après deux ans), les comptes qui concordent souvent avec les autres jusqu'au double. Cela ne fait que classer – aucune donnée n'est modifiée.",
  "reported.notInStock": "Plus dans la base",
  "reported.place": "Lieu",
  "reported.spaces": " · {count} places",
  "reported.lastReported": "Dernier signalement",
  "reported.lastConfirmed": "Dernière confirmation",
  "reported.showOnMap": "Place sur la carte",
  "reported.confirmedGone":
    "N'était plus incluse lors du dernier import – le signalement s'est donc confirmé.",

  "feedback.status.neu": "Nouveau",
  "feedback.status.in_arbeit": "En cours",
  "feedback.status.umgesetzt": "Réalisé",
  "feedback.status.verworfen": "Rejeté",

  "feedbackAdmin.loadFailed": "Les retours n'ont pas pu être chargés.",
  "feedbackAdmin.changeFailed": "La modification a échoué.",
  "feedbackAdmin.noteFailed": "La note n'a pas pu être enregistrée.",
  "feedbackAdmin.confirmDelete": "Supprimer définitivement le signalement #{id} ?\n\n« {preview}… »",
  "feedbackAdmin.deleteFailed": "La suppression a échoué.",
  "feedbackAdmin.title": "Retours",
  "feedbackAdmin.countsOne": "{total} signalement, dont {neu} nouveau(x) et {done} réalisé(s).",
  "feedbackAdmin.countsMany": "{total} signalements, dont {neu} nouveau(x) et {done} réalisé(s).",
  "feedbackAdmin.filterKind": "Type",
  "feedbackAdmin.filterStatus": "État",
  "feedbackAdmin.all": "Tous",
  "feedbackAdmin.empty": "Aucun signalement – avec ce filtre du moins.",
  "feedbackAdmin.replyTo": "Réponse à",
  "feedbackAdmin.addressRemoved":
    "Adresse supprimée après deux ans ({date}) – le signalement est resté sans suite jusque-là.",
  "feedbackAdmin.account": "Compte",
  "feedbackAdmin.browser": "Navigateur",
  "feedbackAdmin.changed": "Modifié",
  "feedbackAdmin.markDone": "Marquer comme réalisé",
  "feedbackAdmin.reopen": "Remettre sur « nouveau »",
  "feedbackAdmin.discard": "Rejeter",
  "feedbackAdmin.delete": "Supprimer",
  "feedbackAdmin.addNote": "Ajouter une note",
  "feedbackAdmin.note": "Note interne",
  "feedbackAdmin.saveNote": "Enregistrer la note",

  "search.destination": "Destination :",
  "search.change": "Modifier",
  "search.clearDestination": "Supprimer la destination",
  "search.where": "Où allez-vous ?",
  "search.placeholder": "Adresse ou lieu",
  "search.inputLabel": "Destination : adresse ou lieu",
  "search.clearInput": "Effacer la saisie",
  "search.close": "Fermer la recherche de destination",
  "search.searching": "Recherche en cours …",
  "search.empty": "Rien trouvé. Écrivez autrement ou ajoutez la ville.",
  "search.unavailable": "La recherche de lieux est actuellement indisponible.",
  "search.moreLetters": "Encore quelques lettres …",
  "search.retry": "Réessayer",
  "search.recent": "Recherches récentes",
  "search.suggestions": "Suggestions",
  "search.unavailableLocal":
    "La recherche en ligne est actuellement indisponible. Sont affichés les résultats de nos données et vos dernières destinations.",
  "search.forget": "Retirer des dernières destinations",
  "search.kind.city": "Lieu",
  "search.kind.street": "Rue",

  "nearest.spaces": "{count} places",
  "nearest.approx": "Position approximative",
  "nearest.backToMe": "Centrer la carte sur ma position",
  "nearest.spotAt": "Place près de {place}",
  "nearest.nearest": "Place PMR la plus proche",
  "nearest.chosen": "Destination choisie",
  "nearest.showOnMap": "Afficher sur la carte",
  "nearest.closeSuggestion": "Fermer la suggestion et libérer la carte",
  "nearest.details": "Détails",
  "nearest.radius": "Rayon",
  "nearest.nothingInRadius": "rien dans le rayon",
  "nearest.inRadius": "{count} dans le rayon",
  "nearest.closeSelection": "Fermer la sélection",
  "nearest.more": "Autres à proximité ({count})",
  "nearest.withinRadius": "Dans le rayon ({radius})",
  "nearest.beyond": "Au-delà",
  "nearest.chooseHint": "choisir comme destination et afficher sur la carte",

  "app.title": "Places de stationnement PMR",
  "view.map": "Carte",
  "view.list": "Liste",
  "view.settings": "Paramètres",
  "view.feedback": "Retours",
  "view.choose": "Choisir la vue",
  "map.loading": "Chargement de la carte …",
  "map.locating": "Localisation en cours …",
  "map.nearestSpot": "Place la plus proche : {name} – {distance}",
  "map.noneNearby": "Aucune place localisée à proximité.",
  "map.retryLocation": "Réessayer la localisation",
  "map.hintCityLevel": "Zoomez au niveau de la ville pour voir les places.",
  "map.hintTruncated": "Toutes les places ne sont pas chargées – zoomez davantage.",

  "geo.denied":
    "Vous avez refusé l'accès à la position. La carte montre le centre-ville – toutes les places restent visibles.",
  "geo.unavailable":
    "Votre appareil n'a pas pu déterminer de position. La carte montre le centre-ville – toutes les places restent visibles.",
  "geo.timeout":
    "La localisation a pris trop de temps. Vous pouvez réessayer ou utiliser la carte ainsi.",

  "map.clusterOne": "{count} place dans cette zone, touchez pour la séparer",
  "map.clusterMany": "{count} places dans cette zone, touchez pour les séparer",
  "map.marker": "{label}, {spaces}",
  "map.markerTarget": "{label}, {spaces}, destination sélectionnée",
  "map.markerCandidate": "{label}, {spaces}, proposée au choix",
  "map.label": "Carte des places de stationnement PMR",
  "map.attribution":
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs',
  "map.yourLocation": "Votre position",
  "map.destination": "Destination : {label}",

  "meta.title": "wheelee – places de stationnement PMR",
  "meta.description":
    "Trouve la place de stationnement PMR publique la plus proche sur une carte – sur mobile, sans inscription.",

  "error.title": "Quelque chose s'est mal passé",
  "error.text":
    "L'application n'a pas pu afficher cette vue. Ce n'est pas de votre faute. Un deuxième essai suffit souvent – les données de stationnement ne sont pas concernées.",
  "error.retry": "Réessayer",
  "error.backToMap": "Retour à la carte",
  "globalError.title": "wheelee a planté",
  "globalError.text":
    "L'application n'a pas pu démarrer. Ce n'est pas de votre faute. Si le problème persiste après un deuxième essai, il suffit généralement de recharger la page.",

  "account.passwordTooLong": "Le mot de passe ne doit pas dépasser {max} caractères.",
  "stay.minutes": "minutes",
  "stay.hour": "heure",
  "stay.hours": "heures",

  "legal.updated": "Mise à jour : {date}",
  "legal.missingTitle": "Ces informations manquent encore",
  "legal.missingText":
    "Les informations sur l'exploitant ne sont pas renseignées sur ce serveur. C'est une erreur de configuration, pas un oubli dans le texte – la page n'invente rien ici.",
  "legal.missingHow":
    "Il faut définir {name}, {address} et {email} ; le modèle se trouve dans {template}.",

  "legal.germanOnly":
    "Les mentions légales et la politique de confidentialité n'existent qu'en allemand ; la version allemande fait foi.",

  "disclaimer.short":
    "Sans garantie : une place peut être supprimée, déplacée ou actuellement occupée.",
  "disclaimer.stand": "Date des données pour cette ville : {date}.",
  "disclaimer.heading": "À lire avant de partir",
  "disclaimer.body":
    "Les informations proviennent de listes officielles et d'OpenStreetMap et peuvent être périmées. Une place peut être supprimée, déplacée ou actuellement occupée, et une restriction horaire a pu changer.",
  "disclaimer.bodyStrong": "Ne vous fiez pas uniquement à cette application",
  "disclaimer.bodyEnd": "– sur place, c'est la signalisation qui prévaut.",
  "disclaimer.feedback":
    "Si quelque chose ne va pas, un retour aide plus que tout : les retours sont la seule source qui remarque de tels changements.",

  "api.notSignedIn": "Non connecté.",
  "api.invalidRequest": "Requête invalide.",
  "api.unknownMapsApp": "Application de cartes inconnue.",
  "api.unknownLanguage": "Langue inconnue.",
  "api.invalidNumber": "Numéro invalide.",
  "api.unknownStatus": "État inconnu.",
  "api.notFoundOrNoChange": "Introuvable ou rien à modifier.",
  "api.notFound": "Introuvable.",
  "api.tooManyLogins": "Trop de tentatives de connexion. Veuillez réessayer dans quelques minutes.",
  "api.credentialsRequired": "Veuillez saisir l'adresse e-mail et le mot de passe.",
  "api.tooManyPasswordChanges":
    "Trop de tentatives de changement de mot de passe. Veuillez réessayer dans quelques minutes.",
  "api.passwordRequired": "Veuillez indiquer le mot de passe.",
  "api.passwordWrong": "Le mot de passe est incorrect.",
  "api.oldPasswordRequired": "Veuillez indiquer le mot de passe actuel.",
  "api.oldPasswordWrong": "Le mot de passe actuel est incorrect.",
  "api.credentialsWrong": "L'adresse e-mail ou le mot de passe est incorrect.",
  "api.tooManyAttempts": "Trop de tentatives. Veuillez réessayer plus tard.",
  "api.accountExists": "Il existe déjà un compte pour cette adresse. Connectez-vous avec celui-ci.",
  "api.searchUnavailable": "Recherche momentanément indisponible.",
  "api.unknownSpot": "Identifiant de place inconnu.",
  "api.unknownCity": "Ville inconnue.",
  "api.ratingNeedsAccount": "Pour évaluer, il faut un compte.",
  "api.favoriteNeedsAccount": "Pour enregistrer des places, il faut un compte.",
  "api.tooManyFavorites": "Trop de modifications en peu de temps. Veuillez patienter un peu.",
  "api.favoritesFull":
    "Vous avez atteint le nombre maximal de places enregistrées. Retirez-en d'abord une.",
  "api.tooManyRatings": "Trop d'évaluations en peu de temps. Veuillez patienter un peu.",
  "api.unknownRating": "Évaluation inconnue.",

  "api.invitationInvalid": "L'invitation est invalide, expirée ou déjà utilisée.",
  "api.tooManyInvitations": "Trop d'invitations en peu de temps. Veuillez réessayer plus tard.",
  "invitation.title": "Accepter l'invitation",
  "invitation.intro": "Vous avez été invité sur wheelee. Choisissez un mot de passe pour créer votre compte.",
  "invitation.password": "Mot de passe",
  "invitation.submit": "Créer le compte",
  "invitation.missing": "Ce lien ne contient aucune invitation.",
  "invitation.failed": "Cela n'a pas fonctionné. Veuillez réessayer.",
  "invitation.done": "Votre compte est créé, vous êtes connecté.",
  "invitation.toApp": "Vers la carte",

  "api.adminCannotChange":
    "Impossible : il doit rester au moins un compte administrateur actif, et vous supprimez votre propre compte dans les paramètres du compte.",
  "api.lastAdminCannotDelete":
    "Votre compte est le dernier compte administrateur actif et ne peut pas être supprimé. Nommez d'abord quelqu'un d'autre administrateur.",
  "users.title": "Utilisateurs et invitations",
  "users.intro":
    "Les administrateurs gèrent les comptes et invitent d'autres administrateurs. L'application n'envoie pas les invitations par e-mail : vous obtenez un lien que vous transmettez vous-même.",
  "users.inviteEmail": "Adresse e-mail de l'invitation",
  "users.inviteRole": "Rôle",
  "users.role.admin": "Admin",
  "users.role.user": "Utilisateur",
  "users.inviteSubmit": "Générer le lien d'invitation",
  "users.inviteCreated":
    "Lien d'invitation pour {email}. Il n'est affiché qu'une fois et est valable sept jours – transmettez-le vous-même.",
  "users.copy": "Copier le lien",
  "users.copied": "Copié",
  "users.accounts": "Comptes",
  "users.invitations": "Invitations",
  "users.you": "vous",
  "users.disabled": "bloqué",
  "users.lastLogin": "Dernière connexion : {date}",
  "users.never": "jamais connecté",
  "users.search": "Rechercher des comptes (partie de l'adresse e-mail)",
  "users.count": "{shown} sur {total} comptes – administrateurs et comptes bloqués d'abord",
  "users.noMatch": "Aucun compte ne correspond à la recherche.",
  "users.more": "Afficher d'autres comptes",
  "users.makeAdmin": "Nommer administrateur",
  "users.makeUser": "Retirer le droit d'administrateur",
  "users.disable": "Bloquer",
  "users.enable": "Débloquer",
  "users.delete": "Supprimer",
  "users.deleteConfirm":
    "Supprimer définitivement le compte {email} avec ses évaluations et ses favoris ?",
  "users.state.open": "ouverte",
  "users.state.used": "utilisée",
  "users.state.expired": "expirée",
  "users.state.revoked": "retirée",
  "users.expires": "valable jusqu'au {date}",
  "users.revoke": "Retirer",
  "users.failed": "Cela n'a pas fonctionné.",

  // Chiffres de visiteurs dans l'administration (ToDo 20.1)
  "visits.title": "Visiteurs",
  "visits.note":
    "Seules les personnes ayant ouvert le site sont comptées : ni moteurs de recherche, ni services de mesure, ni aperçus de liens. Qui a activé « Ne pas suivre » n'est pas compté, les chiffres sont donc un minimum. Un visiteur compte une fois par jour, sans cookie et sans identifiant enregistré.",
  "visits.range": "Période",
  "visits.lastDays": "{count} jours",
  "visits.today": "Aujourd'hui",
  "visits.inRange": "Visiteurs, {count} derniers jours",
  "visits.views": "Pages vues sur la période",
  "visits.total": "Visiteurs au total",
  "visits.totalSince": "Visiteurs au total depuis le {date}",
  "visits.none": "Aucune visite comptée pour l'instant.",
  "visits.row": "{visitors} / {views}",
  "visits.loadFailed": "Les chiffres de visiteurs n'ont pas pu être chargés.",

  // Liens par e-mail : mot de passe oublié, changer d'adresse (ToDo 11.1, 11.8)
  "api.mailLinkInvalid": "Le lien n'est pas valide, a expiré ou a déjà été utilisé.",
  "api.emailSame": "C'est déjà l'adresse de ce compte.",
  "mail.reset.subject": "wheelee : réinitialiser le mot de passe",
  "mail.reset.body":
    "Bonjour,\n\nce lien vous permet de définir un nouveau mot de passe sur wheelee. Il est valable {minutes} minutes et une seule fois :\n\n{link}\n\nSi vous ne l'avez pas demandé, ignorez cet e-mail : votre mot de passe reste inchangé.\n",
  "mail.email.subject": "wheelee : confirmer votre nouvelle adresse e-mail",
  "mail.email.body":
    "Bonjour,\n\nce lien confirme cette adresse comme nouvelle adresse e-mail de votre compte wheelee. Il est valable {minutes} minutes et une seule fois :\n\n{link}\n\nSi vous ne l'avez pas demandé, ignorez cet e-mail : rien ne change.\n",
  "account.forgot": "Mot de passe oublié ?",
  "account.forgotIntro": "Nous envoyons un lien de réinitialisation à l'adresse de votre compte.",
  "account.forgotSend": "Envoyer le lien",
  "account.forgotSent":
    "S'il existe un compte pour cette adresse, nous avons envoyé un lien. Il est valable une heure.",
  "reset.title": "Définir un nouveau mot de passe",
  "reset.intro": "Choisissez un nouveau mot de passe. Vous serez ensuite déconnecté partout et vous vous reconnecterez avec lui.",
  "reset.password": "Nouveau mot de passe",
  "reset.submit": "Enregistrer le mot de passe",
  "reset.missing": "Ce lien ne contient aucun jeton.",
  "reset.failed": "Cela n'a pas fonctionné. Veuillez réessayer.",
  "reset.done": "Votre mot de passe a été modifié. Vous pouvez maintenant vous connecter avec lui.",
  "emailChange.open": "Changer l'adresse e-mail",
  "emailChange.note":
    "Nous envoyons un lien à la nouvelle adresse. Elle n'est prise en compte qu'une fois le lien ouvert ; d'ici là, l'actuelle reste valable.",
  "emailChange.newEmail": "Nouvelle adresse e-mail",
  "emailChange.password": "Votre mot de passe, pour confirmer",
  "emailChange.submit": "Envoyer le lien",
  "emailChange.sent":
    "Si l'adresse est libre, nous y avons envoyé un lien. Tant que vous ne l'ouvrez pas, l'adresse actuelle reste valable.",
  "confirmEmail.title": "Confirmer l'adresse e-mail",
  "confirmEmail.intro": "En un clic, cette adresse devient l'adresse e-mail de votre compte.",
  "confirmEmail.submit": "Utiliser cette adresse",
  "confirmEmail.done": "C'est fait : votre compte est désormais associé à {email}.",
  "confirmEmail.missing": "Ce lien ne contient aucun jeton.",
  "confirmEmail.failed": "Cela n'a pas fonctionné. Veuillez demander un nouveau lien.",
};
