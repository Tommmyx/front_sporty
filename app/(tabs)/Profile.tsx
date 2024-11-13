import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileIcon(navigation) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(require('../../assets/images/profile_icons/woman.png')); 

    const iconLibrary = [
        require('../../assets/images/profile_icons/woman.png'),
        require('../../assets/images/profile_icons/man.png'),
        require('../../assets/images/profile_icons/totoro.png')

    ];

    const openProfile = () => {
        setModalVisible(true);
    };

    const closeProfile = () => {
        setModalVisible(false);
    };

    const selectIcon = (icon) => {
        setSelectedIcon(icon);
        closeProfile();
    };

    return (
        <View style={{ position: 'absolute', top: 40, right: 20}}>
            <TouchableOpacity onPress={openProfile}>
                <Image source={selectedIcon} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: "white"}} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeProfile}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                            Sélectionne ton icône de profil
                        </Text>

                        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {iconLibrary.map((icon, index) => (
                                <TouchableOpacity key={index} onPress={() => selectIcon(icon)} style={{ margin: 10 }}>
                                    <Image source={icon} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity onPress={closeProfile} style={{ marginTop: 20, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'blue' }}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
