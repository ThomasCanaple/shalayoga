# shalayoga
Studio Shala Yoga 🧘‍♀️ | Ashtanga yoga &amp; Yoga prénatal.

## Contacts par telephone

Les contacts directs par telephone, SMS et WhatsApp sont masques dans le site.
Pour les afficher a nouveau, remplacer `data-phone-contact-enabled="false"`
par `data-phone-contact-enabled="true"` sur la balise `<html>` de [index.html](index.html).
Remettre `false` pour les masquer. Ce reglage fonctionne aussi sans JavaScript.
Les liens par e-mail et vers le groupe WhatsApp restent disponibles.

## Visibilite du planning

La section Planning et ses liens (menu principal, menu mobile et footer) sont masques.
Pour les reactiver, remplacer `data-planning-enabled="false"` par
`data-planning-enabled="true"` sur la balise `<html>` de [index.html](index.html).
Remettre `false` pour les masquer. Ce reglage fonctionne aussi sans JavaScript.
Les liens `href="#planning"` sont masques automatiquement ; ajouter `data-planning`
sur leur conteneur si celui-ci doit egalement disparaitre (par exemple un `<li>`).
