import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify?: (code: string) => void;
}

export function VerificationModal({ visible, onClose, onVerify }: VerificationModalProps) {
  const [code, setCode] = useState('');
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  React.useEffect(() => {
    if (code.length === 6) {
      if (onVerify) {
        onVerify(code);
        setCode('');
      } else {
        setTimeout(() => {
          onClose();
          setCode('');
          router.replace('/');
        }, 300);
      }
    }
  }, [code, router, onClose, onVerify]);

  const handleModalShow = () => {
    // Focus the input once the modal is fully visible
    inputRef.current?.focus();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      onShow={handleModalShow}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.overlay} />

        <View className="bg-white rounded-t-3xl p-6 w-full pb-10 shadow-lg">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-nunito-extrabold text-[#0D152D]">Verify Email</Text>
            <TouchableOpacity onPress={onClose} className="p-2 bg-gray-100 rounded-full">
              <Feather name="x" size={20} color="#0D152D" />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-500 font-nunito text-base mb-6">
            We've sent a 6-digit verification code to your email. Please enter it below.
          </Text>

          {/* Wrapper to allow tapping anywhere on the numbers to focus */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            className="flex-row justify-between items-center mb-8 relative"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View
                key={index}
                className={`w-12 h-14 border rounded-xl items-center justify-center ${code.length === index ? 'border-[#5B42FF] bg-[#F0F7FF]' : 'border-gray-200 bg-white'}`}
              >
                <Text className="text-2xl font-nunito-extrabold text-[#0D152D]">
                  {code[index] || ''}
                </Text>
              </View>
            ))}

            {/* Hidden Input for Keyboard */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={(text) => setCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
              keyboardType="number-pad"
              className="absolute opacity-0 w-full h-full"
              maxLength={6}
              caretHidden
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
