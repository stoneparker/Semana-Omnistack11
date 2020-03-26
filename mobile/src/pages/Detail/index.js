import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import  * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
     const navigation = useNavigation();
     const message = 'Olá APAD, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelada" com o valor de R$ 120,00';


     function navigateBack() {
          navigation.goBack(); // volta para a página anterior
     }

     function sendMail() {
          MailComposer.composeAsync({
               subject: 'Herói do caso: Cadelinha atropelada',
               recipients: ['heyvitoria.lopes@gmail.com', 'vitor13m2003@gmail.com'],
               body: message,
          })
     }

     function sendWhatsapp() {
          Linking.openURL(`whatsapp://send?phone=5511952316039&text=${message}`)
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
                    <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                    <Text style={styles.incidentValue}>APAD</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>R4 120,00</Text>
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