import { useThemeColor } from '@/hooks/useThemeColor'
import FadeInImage from '@/presentation/images/FadeInImage'
import ThemedView from '@/presentation/shared/ThemedView'
import { useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'

const InfiniteScrollScreen = () => {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6])
  const primaryColor = useThemeColor({}, 'primary')

  const loadMore = () => {
    const newArray = Array.from({ length: 5 }, (_, i) => numbers.length + i)
    setTimeout(() => {
      setNumbers([...numbers, ...newArray])
    }, 2000)
  }

  return (
    <ThemedView>
      <FlatList
        data={numbers}
        renderItem={({ item }) => <ListItem number={item}></ListItem>}
        onEndReached={loadMore}
        /* Cuando esté en en 60 del scroll */
        onEndReachedThreshold={0.6}
        ListFooterComponent={() => (
          <View style={{ height: 150, justifyContent: 'center' }}>
            <ActivityIndicator
              size={40}
              color={primaryColor}
            ></ActivityIndicator>
          </View>
        )}
      ></FlatList>
    </ThemedView>
  )
}
export default InfiniteScrollScreen

interface ListItemProps {
  number: number
}

const ListItem = ({ number }: ListItemProps) => {
  return (
    <FadeInImage
      uri={`https://picsum.photos/id/${number}/500/400`}
      style={{
        height: 400,
        width: '100%'
      }}
    />
    // <Image
    //   source={{ uri: `https://picsum.photos/id/${number}/500/400` }}
    //   style={{ height: 400, width: '100%' }}
    // ></Image>
  )
}
