import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { Input } from '../../../components/atoms/Input';
import { CreateBetFormData, FormErrors, CategoryOption } from './types';
import { Category, MarketType } from '../../../types/entities';
import { categoryLabels } from '../../../assets/data/mock-data';

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'politique', label: 'Politique', icon: '🏛️' },
  { value: 'sport', label: 'Sport', icon: '⚽' },
  { value: 'economie', label: 'Économie', icon: '💰' },
  { value: 'technologie', label: 'Technologie', icon: '💻' },
  { value: 'societe', label: 'Société', icon: '👥' },
];

const QUESTION_MAX_LENGTH = 280;

export const CreateBetScreen: React.FC = () => {
  const [formData, setFormData] = useState<CreateBetFormData>({
    question: '',
    category: 'politique',
    type: 'binary',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week from now
    options: ['Oui', 'Non'], // Default binary options
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Question validation
    if (!formData.question.trim()) {
      newErrors.question = 'La question est requise';
    } else if (formData.question.trim().length < 10) {
      newErrors.question = 'La question doit contenir au moins 10 caractères';
    } else if (formData.question.length > QUESTION_MAX_LENGTH) {
      newErrors.question = `La question ne peut pas dépasser ${QUESTION_MAX_LENGTH} caractères`;
    }

    // End date validation
    const now = new Date();
    const minDate = new Date(now.getTime() + 60 * 60 * 1000); // At least 1 hour from now
    if (formData.endDate <= minDate) {
      newErrors.endDate = 'La date de fin doit être au moins dans 1 heure';
    }

    // Options validation for multiple choice
    if (formData.type === 'multiple') {
      const validOptions = formData.options.filter(opt => opt.trim() !== '');
      if (validOptions.length < 2) {
        newErrors.options = ['Au moins 2 options sont requises'];
      } else if (validOptions.length > 8) {
        newErrors.options = ['Maximum 8 options autorisées'];
      } else if (validOptions.some(opt => opt.length > 50)) {
        newErrors.options = ['Chaque option ne peut pas dépasser 50 caractères'];
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuestionChange = (text: string) => {
    setFormData(prev => ({ ...prev, question: text }));
    if (errors.question) {
      setErrors(prev => ({ ...prev, question: undefined }));
    }
  };

  const handleCategorySelect = (category: Category) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleTypeToggle = (type: MarketType) => {
    const options = type === 'binary' ? ['Oui', 'Non'] : ['Option 1', 'Option 2'];
    setFormData(prev => ({ 
      ...prev, 
      type, 
      options 
    }));
    setErrors(prev => ({ ...prev, options: undefined }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
    
    if (errors.options) {
      setErrors(prev => ({ ...prev, options: undefined }));
    }
  };

  const addOption = () => {
    if (formData.options.length < 8) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, `Option ${prev.options.length + 1}`]
      }));
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, options: newOptions }));
    }
  };

  const handleDateChange = (days: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + days);
    setFormData(prev => ({ ...prev, endDate: newDate }));
    
    if (errors.endDate) {
      setErrors(prev => ({ ...prev, endDate: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Placeholder for API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Pari créé !',
        'Votre marché de prédiction a été créé avec succès.',
        [{ text: 'OK', onPress: () => {
          // Reset form
          setFormData({
            question: '',
            category: 'politique',
            type: 'binary',
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            options: ['Oui', 'Non'],
          });
          setErrors({});
        }}]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer le pari. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 space-y-6">
        {/* Header */}
        <View className="mb-2">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Créer un nouveau pari
          </Text>
          <Text className="text-gray-600">
            Posez une question et laissez la communauté prédire l'avenir
          </Text>
        </View>

        {/* Question Input */}
        <View>
          <Input
            label="Question"
            value={formData.question}
            onChangeText={handleQuestionChange}
            placeholder="Ex: Qui remportera les élections présidentielles 2027 ?"
            multiline
            numberOfLines={3}
            maxLength={QUESTION_MAX_LENGTH}
            error={errors.question}
            className="min-h-[80px]"
          />
          <Text className="text-xs text-gray-500 mt-1">
            {formData.question.length}/{QUESTION_MAX_LENGTH} caractères
          </Text>
        </View>

        {/* Category Selection */}
        <View>
          <Text className="text-gray-700 font-medium mb-3 text-sm">
            Catégorie
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {CATEGORY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleCategorySelect(option.value)}
                  className={`px-4 py-3 rounded-full border flex-row items-center ${
                    formData.category === option.value
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <Text className="text-base mr-2">{option.icon}</Text>
                  <Text
                    className={`font-medium ${
                      formData.category === option.value
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Type Toggle */}
        <View>
          <Text className="text-gray-700 font-medium mb-3 text-sm">
            Type de pari
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => handleTypeToggle('binary')}
              className={`flex-1 p-4 rounded-lg border ${
                formData.type === 'binary'
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
            >
              <Text className="font-medium text-center text-gray-900">
                Oui/Non
              </Text>
              <Text className="text-xs text-gray-500 text-center mt-1">
                Réponse binaire
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleTypeToggle('multiple')}
              className={`flex-1 p-4 rounded-lg border ${
                formData.type === 'multiple'
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
            >
              <Text className="font-medium text-center text-gray-900">
                Choix multiple
              </Text>
              <Text className="text-xs text-gray-500 text-center mt-1">
                Plusieurs options
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Options Management for Multiple Choice */}
        {formData.type === 'multiple' && (
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-700 font-medium text-sm">
                Options de réponse
              </Text>
              {formData.options.length < 8 && (
                <TouchableOpacity
                  onPress={addOption}
                  className="bg-blue-500 px-3 py-1 rounded-full"
                >
                  <Text className="text-white text-xs font-medium">
                    + Ajouter
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            
            {formData.options.map((option, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <View className="flex-1 mr-2">
                  <Input
                    value={option}
                    onChangeText={(text) => handleOptionChange(index, text)}
                    placeholder={`Option ${index + 1}`}
                    maxLength={50}
                  />
                </View>
                {formData.options.length > 2 && (
                  <TouchableOpacity
                    onPress={() => removeOption(index)}
                    className="p-2"
                  >
                    <Text className="text-red-500 font-bold">×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            
            {errors.options && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.options[0]}
              </Text>
            )}
          </View>
        )}

        {/* End Date Selection */}
        <View>
          <Text className="text-gray-700 font-medium mb-3 text-sm">
            Date de fin
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {[
              { days: 1, label: '1 jour' },
              { days: 3, label: '3 jours' },
              { days: 7, label: '1 semaine' },
              { days: 30, label: '1 mois' },
              { days: 90, label: '3 mois' },
            ].map((period) => (
              <TouchableOpacity
                key={period.days}
                onPress={() => handleDateChange(period.days)}
                className="px-4 py-2 rounded-full bg-gray-100 border border-gray-300"
              >
                <Text className="text-gray-700 font-medium text-sm">
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text className="text-xs text-gray-500 mt-2">
            Fin prévue: {formData.endDate.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
          
          {errors.endDate && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.endDate}
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <View className="pt-4">
          <Button
            title="Créer le pari"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            size="large"
            className="w-full"
          />
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </View>
    </ScrollView>
  );
};
