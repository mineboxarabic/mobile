import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Text } from '../../../components/atoms/Text';
import { Button } from '../../../components/atoms/Button';

// Types
import { HomeScreenProps } from './types';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleNavigateToSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="py-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Polymarket Clone
          </Text>
          <Text className="text-lg text-gray-600">
            Marché de prédiction décentralisé
          </Text>
        </View>

        {/* Welcome Section */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Bienvenue sur votre plateforme de paris
          </Text>
          <Text className="text-gray-600 leading-6 mb-6">
            Découvrez et pariez sur les événements qui vous intéressent. 
            Notre système de recherche avancé vous permet de trouver facilement 
            les marchés qui correspondent à vos préférences.
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </Text>
          
          <Button
            title="🔍 Rechercher des marchés"
            onPress={handleNavigateToSearch}
            className="mb-4 bg-blue-500 hover:bg-blue-600"
          />

          <Button
            title="� Voir les tendances"
            onPress={() => {/* TODO: Navigate to trending */}}
            className="mb-4 bg-green-500 hover:bg-green-600"
          />

          <Button
            title="🏆 Classement"
            onPress={() => {/* TODO: Navigate to leaderboard */}}
            className="mb-4 bg-purple-500 hover:bg-purple-600"
          />

          <Button
            title="➕ Créer un pari"
            onPress={() => {/* TODO: Navigate to create bet */}}
            className="mb-4 bg-orange-500 hover:bg-orange-600"
          />
        </View>

        {/* Features Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Fonctionnalités disponibles
          </Text>
          
          <View className="bg-gray-50 p-4 rounded-lg mb-4">
            <Text className="font-semibold text-gray-900 mb-2">
              ✅ Recherche avancée
            </Text>
            <Text className="text-gray-600">
              Trouvez des marchés par catégorie, statut et popularité avec notre 
              système de recherche intelligent et nos filtres avancés.
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg mb-4">
            <Text className="font-semibold text-gray-900 mb-2">
              🚧 En développement
            </Text>
            <Text className="text-gray-600">
              Tendances, classement, création de paris et profil utilisateur.
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Statistiques de la plateforme
          </Text>
          
          <View className="flex-row justify-between">
            <View className="bg-blue-50 p-4 rounded-lg flex-1 mr-2">
              <Text className="text-2xl font-bold text-blue-600">6</Text>
              <Text className="text-blue-600 text-sm">Marchés actifs</Text>
            </View>
            
            <View className="bg-green-50 p-4 rounded-lg flex-1 mx-1">
              <Text className="text-2xl font-bold text-green-600">4</Text>
              <Text className="text-green-600 text-sm">Utilisateurs</Text>
            </View>
            
            <View className="bg-purple-50 p-4 rounded-lg flex-1 ml-2">
              <Text className="text-2xl font-bold text-purple-600">5</Text>
              <Text className="text-purple-600 text-sm">Catégories</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
