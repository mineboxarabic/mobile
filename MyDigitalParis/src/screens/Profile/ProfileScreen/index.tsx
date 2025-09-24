import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Text } from '../../../components/atoms/Text';
import { Button } from '../../../components/atoms/Button';
import { Icon } from '../../../components/atoms/Icon';

// Types
import { ProfileScreenProps } from './types';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="py-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Profil
          </Text>
          <Text className="text-lg text-gray-600">
            Gérez votre compte et vos préférences
          </Text>
        </View>

        {/* User Info */}
        <View className="mb-8 bg-gray-50 p-4 rounded-lg">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mr-4">
              <Icon name="user" size={32} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-xl font-semibold text-gray-900">
                Utilisateur Demo
              </Text>
              <Text className="text-gray-600">
                demo@polymarket.com
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Mes statistiques
          </Text>
          
          <View className="flex-row justify-between mb-4">
            <View className="bg-blue-50 p-4 rounded-lg flex-1 mr-2">
              <Text className="text-2xl font-bold text-blue-600">12</Text>
              <Text className="text-blue-600 text-sm">Paris actifs</Text>
            </View>
            
            <View className="bg-green-50 p-4 rounded-lg flex-1 mx-1">
              <Text className="text-2xl font-bold text-green-600">8</Text>
              <Text className="text-green-600 text-sm">Gagnés</Text>
            </View>
            
            <View className="bg-purple-50 p-4 rounded-lg flex-1 ml-2">
              <Text className="text-2xl font-bold text-purple-600">67%</Text>
              <Text className="text-purple-600 text-sm">Taux de réussite</Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Paramètres
          </Text>
          
          <Button
            title="📊 Mes paris"
            onPress={() => {/* TODO: Navigate to user bets */}}
            className="mb-4 bg-gray-100 text-gray-900"
          />

          <Button
            title="🔔 Notifications"
            onPress={() => {/* TODO: Navigate to notifications */}}
            className="mb-4 bg-gray-100 text-gray-900"
          />

          <Button
            title="⚙️ Préférences"
            onPress={() => {/* TODO: Navigate to settings */}}
            className="mb-4 bg-gray-100 text-gray-900"
          />

          <Button
            title="❓ Aide"
            onPress={() => {/* TODO: Navigate to help */}}
            className="mb-4 bg-gray-100 text-gray-900"
          />

          <Button
            title="🚪 Déconnexion"
            onPress={() => {/* TODO: Logout */}}
            className="mb-4 bg-red-500 hover:bg-red-600"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
