import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 p-4 gap-4">
      <View className="flex-1 items-center justify-center">
        <Text className="text-4xl font-bold mb-8">Button Examples</Text>
        
        <View className="gap-4 w-full max-w-sm">
          <Button 
            onPress={() => alert('Default button pressed')}
            variant="default"
          >
            <Text>Default Button</Text>
          </Button>

          <Button 
            onPress={() => alert('Secondary button pressed')}
            variant="secondary"
          >
            <Text>Secondary Button</Text>
          </Button>

          <Button 
            onPress={() => alert('Destructive button pressed')}
            variant="destructive"
          >
            <Text>Destructive Button</Text>
          </Button>

          <Button 
            onPress={() => alert('Outline button pressed')}
            variant="outline"
          >
            <Text>Outline Button</Text>
          </Button>

          <Button 
            onPress={() => alert('Ghost button pressed')}
            variant="ghost"
          >
            <Text>Ghost Button</Text>
          </Button>

          <Button 
            onPress={() => alert('Link button pressed')}
            variant="link"
          >
            <Text>Link Button</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
