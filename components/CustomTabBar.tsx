import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInRight, FadeOutRight, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row bg-white border-t border-gray-200 px-2"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20, paddingTop: 10, height: 75 + (insets.bottom > 0 ? insets.bottom : 20) }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarItem
            key={route.key}
            isFocused={isFocused}
            route={route}
            options={options}
            label={label}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}

function TabBarItem({ isFocused, route, options, label, onPress, onLongPress }: any) {
  let iconName: any = 'home';
  if (route.name === 'index') iconName = 'home';
  else if (route.name === 'learn') iconName = 'book-open';
  else if (route.name === 'ai-teacher') iconName = 'video';
  else if (route.name === 'chat') iconName = 'message-circle';
  else if (route.name === 'profile') iconName = 'user';

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(16).stiffness(120)}
      style={{ flex: isFocused ? 2 : 1, marginHorizontal: 4 }}
    >
      <Pressable
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarButtonTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        className={`flex-1 flex-row items-center justify-center rounded-full h-[50px] ${isFocused ? 'bg-[#58CC02]/30' : 'bg-transparent'
          }`}
      >
        <Feather
          name={iconName}
          size={22}
          color={isFocused ? '#58CC02' : '#AFAFAF'}
        />
        {isFocused && (
          <Animated.Text
            entering={FadeInRight.springify().damping(14).stiffness(100)}
            exiting={FadeOutRight.duration(150)}
            className="text-[#58CC02] font-nunito-bold text-sm ml-2"
            numberOfLines={1}
          >
            {typeof label === 'function' ? route.name : label as string}
          </Animated.Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

