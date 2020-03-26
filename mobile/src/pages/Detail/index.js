import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import  * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
     const navigation = useNavigation();
     const route = useRoute();

     const incident = route.params.incident; // nome do parâmetro passado

     const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {
          style: 'currency', currency: 'BRL'}).format(incident.value)}`;

     function navigateBack() {
          navigation.goBack(); // volta para a página anterior
     }

     function sendMail() {
          MailComposer.composeAsync({
               subject: `Herói do caso: ${incident.title}`,
               recipients: ['heyvitoria.lopes@gmail.com', 'vitor13m2003@gmail.com', incident.email],
               body: message,
          })
     }

     function sendWhatsapp() {
          Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`)
     }

     return (
          <View style={styles.container}>
               <View style={styles.header}>
                    <Image source={logoImg} />

               <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
               </TouchableOpacity>
               </View>

               <View style={styles.incident}>
                    <View style={[styles.incidentsLine]}>
                         <View>
                              <Text style={[styles.incidentProperty, { marginTop: 0 }]}>CASO:</Text>
                              <Text style={styles.incidentValue}>{incident.title}</Text>
                         </View>

                         <View>
                              <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                              <Text style={styles.incidentValue}>{incident.name}</Text>
                         </View>
                    </View>
                    
                    <Text style={styles.incidentProperty}>LOCALIZAÇÃO:</Text>
                    <Text style={styles.incidentValue}>{incident.city} - {incident.uf}</Text>

                    <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                         {Intl.NumberFormat('pt-BR', {
                              style: 'currency', 
                              currency: 'BRL'
                         }).format(incident.value)}
                    </Text>
               </View>

               <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>
                         <TouchableOpacity 
                              style={styles.action}
                              onPress={sendWhatsapp}
                              >
                              <Text style={styles.actionText}>WhatsApp</Text>
                         </TouchableOpacity>

                         <TouchableOpacity 
                              style={styles.action}
                              onPress={sendMail}
                              >
                              <Text style={styles.actionText}>E-mail</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
}