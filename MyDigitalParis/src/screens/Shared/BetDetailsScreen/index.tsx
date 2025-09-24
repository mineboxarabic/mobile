import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

// Components
import { Text } from '../../../components/atoms/Text';
import { Button } from '../../../components/atoms/Button';

// Types
import { RootStackParamList } from '../../../navigation/AppNavigator/types';

type BetDetailsScreenProps = StackScreenProps<RootStackParamList, 'BetDetails'>;

export const BetDetailsScreen: React.FC<BetDetailsScreenProps> = ({ route, navigation }) => {
  const { betId } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="py-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Détails du pari
          </Text>
          <Text className="text-lg text-gray-600">
            ID: {betId}
          </Text>
        </View>

        {/* Placeholder Content */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Cette fonctionnalité sera bientôt disponible
          </Text>
          <Text className="text-gray-600 leading-6">
            Ici vous pourrez voir tous les détails d'un pari spécifique, 
            incluant les statistiques, l'historique des paris, et les options 
            pour placer vos propres paris.
          </Text>
        </View>

        <Button
          title="Retour"
          onPress={() => navigation.goBack()}
          className="mb-4"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BetDetailsScreen;
