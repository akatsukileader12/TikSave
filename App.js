import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, 
  StatusBar, ActivityIndicator, Alert, ScrollView, BackHandler,
  Linking, TextInput, Dimensions, KeyboardAvoidingView, Platform
} from 'react-native';
import { WebView } from 'react-native-webview';

// ===== DATA =====
import { CURRICULUM, getAllLessons } from './data';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ===== STORAGE =====
let memoryStore = {};
const saveProgress = async (lessonId) => {
  memoryStore[lessonId] = true;
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem('@learnweb_progress', JSON.stringify(memoryStore));
  } catch (e) {}
};
const getProgress = async () => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const data = await AsyncStorage.getItem('@learnweb_progress');
    if (data) memoryStore = JSON.parse(data);
  } catch (e) {}
  return memoryStore;
};

// ===== DEFAULT PLAYGROUND CODE =====
const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial; 
      padding: 20px;
      background: #f5f5f5;
    }
    h1 { color: #E44D26; }
    .box {
      background: #264DE4;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>Hello Web Dev!</h1>
  <div class="box">
    Edit the code above and see changes live!
  </div>
  <script>
    console.log("JavaScript is running!");
  </script>
</body>
</html>`;

// ===== SPLASH SCREEN =====
const SplashScreen = ({ onFinish }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Learn Web Dev';
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => onFinish());
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View style={{ 
      flex: 1, justifyContent: 'center', alignItems: 'center', 
      backgroundColor: '#F8F9FA', opacity: fadeAnim 
    }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>🌐</Text>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#333' }}>
        {displayText}<Text style={{ color: '#2196F3' }}>|</Text>
      </Text>
    </Animated.View>
  );
};

// ===== PLAYGROUND SCREEN =====
const PlaygroundScreen = ({ onBack }) => {
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
  const [activeTab, setActiveTab] = useState('preview'); // 'code' | 'preview' | 'split'
  const webViewRef = useRef(null);

  const runCode = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const resetCode = () => {
    Alert.alert(
      'Reset Code?',
      'This will restore the default template.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => setHtmlCode(DEFAULT_HTML) }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />
      
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: 12, backgroundColor: '#2D2D2D', borderBottomWidth: 1, borderBottomColor: '#444'
      }}>
        <TouchableOpacity onPress={onBack}>
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>🛠️ Playground</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={resetCode} style={{ marginRight: 12 }}>
            <Text style={{ color: '#FF6B6B', fontSize: 14 }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={runCode}>
            <Text style={{ color: '#4CAF50', fontSize: 14, fontWeight: '600' }}>▶ Run</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Switcher */}
      <View style={{ flexDirection: 'row', backgroundColor: '#2D2D2D', borderBottomWidth: 1, borderBottomColor: '#444' }}>
        {['code', 'split', 'preview'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={{ 
              flex: 1, paddingVertical: 10, alignItems: 'center',
              backgroundColor: activeTab === tab ? '#444' : '#2D2D2D',
              borderBottomWidth: activeTab === tab ? 2 : 0,
              borderBottomColor: '#4CAF50'
            }}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={{ 
              color: activeTab === tab ? '#4CAF50' : '#888', 
              fontWeight: activeTab === tab ? '600' : '400',
              textTransform: 'capitalize'
            }}>
              {tab === 'code' ? '📝 Code' : tab === 'split' ? '⚡ Split' : '👁️ Preview'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {activeTab === 'code' && (
          <ScrollView style={{ flex: 1 }}>
            <TextInput
              multiline
              value={htmlCode}
              onChangeText={setHtmlCode}
              style={{
                color: '#D4D4D4',
                fontFamily: 'monospace',
                fontSize: 13,
                lineHeight: 20,
                padding: 16,
                textAlignVertical: 'top',
                minHeight: SCREEN_HEIGHT * 0.7
              }}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />
          </ScrollView>
        )}

        {activeTab === 'preview' && (
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: htmlCode }}
            style={{ flex: 1, backgroundColor: '#FFF' }}
          />
        )}

        {activeTab === 'split' && (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#444' }}>
              <TextInput
                multiline
                value={htmlCode}
                onChangeText={setHtmlCode}
                style={{
                  color: '#D4D4D4',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  lineHeight: 18,
                  padding: 12,
                  textAlignVertical: 'top',
                  flex: 1
                }}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
              />
            </View>
            <View style={{ flex: 1 }}>
              <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: htmlCode }}
                style={{ flex: 1, backgroundColor: '#FFF' }}
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ===== FLOATING PLAYGROUND BUTTON =====
const PlaygroundButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      top: 16,
      right: 70, // Left of About button
      zIndex: 100,
      backgroundColor: '#FF9800',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5
    }}
  >
    <Text style={{ fontSize: 20 }}>🛠️</Text>
  </TouchableOpacity>
);

// ===== COMPONENTS =====
const ProgressBar = ({ current, total, color }) => {
  const pct = Math.round((current / total) * 100) || 0;
  return (
    <View style={{ padding: 16 }}>
      <View style={{ height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 }}>
        <View style={{ width: pct + '%', height: '100%', backgroundColor: color || '#4CAF50', borderRadius: 4 }} />
      </View>
      <Text style={{ marginTop: 8, fontSize: 12, color: '#666', textAlign: 'center' }}>{current}/{total} lessons ({pct}%)</Text>
    </View>
  );
};

const LessonCard = ({ topic, completedCount, onPress }) => {
  const pct = Math.round((completedCount / topic.lessons.length) * 100) || 0;
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: topic.color, borderLeftWidth: 4 }]} onPress={onPress}>
      <Text style={{ fontSize: 32, marginRight: 16 }}>{topic.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{topic.title}</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{topic.desc}</Text>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{topic.lessons.length} lessons</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <View style={{ flex: 1, height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, marginRight: 8 }}>
            <View style={{ width: pct + '%', height: '100%', backgroundColor: topic.color, borderRadius: 3 }} />
          </View>
          <Text style={{ fontSize: 12, color: '#666' }}>{pct}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const LessonViewer = ({ sections, onCheckpointComplete, lessonCompleted }) => {
  const [completedChecks, setCompletedChecks] = useState({});
  const [anyCorrect, setAnyCorrect] = useState(lessonCompleted);

  useEffect(() => {
    setCompletedChecks({});
    setAnyCorrect(lessonCompleted);
  }, [sections, lessonCompleted]);

  const handleCheck = (index, correct) => {
    setCompletedChecks({ ...completedChecks, [index]: correct });
    if (correct) {
      setAnyCorrect(true);
      if (onCheckpointComplete) onCheckpointComplete();
    }
  };

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'intro':
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>{section.heading}</Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#444', marginBottom: 10 }}>{section.text}</Text>
            {section.analogy && (
              <View style={{ backgroundColor: '#E3F2FD', borderLeftWidth: 4, borderLeftColor: '#2196F3', padding: 12, borderRadius: 4, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, marginRight: 8 }}>💡</Text>
                <Text style={{ fontSize: 15, color: '#1565C0', flex: 1 }}><Text style={{ fontWeight: '600' }}>Analogy:</Text> {section.analogy}</Text>
              </View>
            )}
          </View>
        );
      case 'concept':
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>{section.heading}</Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#444', marginBottom: 10 }}>{section.text}</Text>
            {section.code && (
              <View style={{ backgroundColor: '#1E1E1E', borderRadius: 8, padding: 16, marginVertical: 12 }}>
                <Text style={{ color: '#D4D4D4', fontFamily: 'monospace', fontSize: 13, lineHeight: 20 }}>{section.code}</Text>
              </View>
            )}
            {section.breakdown && (
              <View style={{ backgroundColor: '#F5F5F5', padding: 12, borderRadius: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 }}>🔍 Breakdown:</Text>
                {section.breakdown.map((item, i) => (
                  <Text key={i} style={{ fontSize: 14, color: '#555', marginVertical: 3 }}>• {item}</Text>
                ))}
              </View>
            )}
          </View>
        );
      case 'warning':
        return (
          <View key={index} style={{ backgroundColor: '#FFF3E0', borderLeftWidth: 4, borderLeftColor: '#FF9800', padding: 16, borderRadius: 4, marginVertical: 12, flexDirection: 'row' }}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#E65100', marginBottom: 8 }}>{section.heading}</Text>
              <Text style={{ fontSize: 16, lineHeight: 24, color: '#444', marginBottom: 10 }}>{section.text}</Text>
              {section.wrong && (
                <View style={{ backgroundColor: '#FFEBEE', padding: 10, borderRadius: 6, marginVertical: 8 }}>
                  <Text style={{ color: '#C62828', fontWeight: '600' }}>❌ Wrong:</Text>
                  <Text style={{ color: '#B71C1C', fontFamily: 'monospace', fontSize: 13 }}>{section.wrong}</Text>
                </View>
              )}
              {section.right && (
                <View style={{ backgroundColor: '#E8F5E9', padding: 10, borderRadius: 6, marginVertical: 8 }}>
                  <Text style={{ color: '#2E7D32', fontWeight: '600' }}>✅ Right:</Text>
                  <Text style={{ color: '#1B5E20', fontFamily: 'monospace', fontSize: 13 }}>{section.right}</Text>
                </View>
              )}
              {section.why && <Text style={{ fontSize: 15, color: '#555', marginTop: 8 }}>🎯 <Text style={{ fontWeight: '600' }}>Why:</Text> {section.why}</Text>}
            </View>
          </View>
        );
      case 'try-it':
        return (
          <View key={index} style={{ backgroundColor: '#E8F5E9', borderRadius: 12, padding: 16, marginVertical: 12, borderWidth: 2, borderColor: '#4CAF50' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2E7D32', marginBottom: 10 }}>🛠️ {section.heading}</Text>
            <Text style={{ fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 10 }}>{section.instruction}</Text>
            {section.starter && (
              <View style={{ backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12, marginVertical: 10 }}>
                <Text style={{ color: '#858585', fontSize: 12, marginBottom: 6 }}>Starter code:</Text>
                <Text style={{ color: '#D4D4D4', fontFamily: 'monospace', fontSize: 13 }}>{section.starter}</Text>
              </View>
            )}
            <Text style={{ fontSize: 14, color: '#666', fontStyle: 'italic' }}>💡 Practice in a code editor or the interactive playground.</Text>
          </View>
        );
      case 'checkpoint':
        const isDone = completedChecks[index];
        return (
          <View key={index} style={{ backgroundColor: '#F5F5F5', borderRadius: 12, padding: 16, marginVertical: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 }}>📝 {section.heading}</Text>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 14 }}>{section.question}</Text>
            {section.options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  backgroundColor: isDone !== undefined && i === section.correct ? '#E8F5E9' : isDone === false && i !== section.correct ? '#FFEBEE' : 'white',
                  padding: 14,
                  borderRadius: 8,
                  marginVertical: 6,
                  borderWidth: 2,
                  borderColor: isDone !== undefined && i === section.correct ? '#4CAF50' : '#E0E0E0'
                }}
                onPress={() => { if (isDone === undefined) handleCheck(index, i === section.correct); }}
                disabled={isDone !== undefined}
              >
                <Text style={{ fontSize: 15, color: '#444' }}>{opt}</Text>
              </TouchableOpacity>
            ))}
            {isDone === true && (
              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <Text style={{ fontSize: 28 }}>🎉</Text>
                <Text style={{ fontSize: 15, color: '#333', marginTop: 8, textAlign: 'center' }}>Correct! {section.explanation}</Text>
              </View>
            )}
            {isDone === false && (
              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <Text style={{ fontSize: 28 }}>❌</Text>
                <Text style={{ fontSize: 15, color: '#333', marginTop: 8, textAlign: 'center' }}>Not quite. {section.explanation}</Text>
              </View>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {sections.map((section, index) => renderSection(section, index))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

// ===== ABOUT SCREEN =====
const AboutScreen = ({ onBack }) => {
  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert('Error', 'Cannot open this link on your device.');
    } catch (e) {
      Alert.alert('Error', 'Something went wrong opening the link.');
    }
  };

  const ContactItem = ({ icon, label, value, onPress, color }) => (
    <TouchableOpacity 
      style={{ 
        flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', 
        padding: 16, borderRadius: 12, marginBottom: 12,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
      }} 
      onPress={onPress}
    >
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
        <Text style={{ fontSize: 24 }}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, color: '#888', marginBottom: 2 }}>{label}</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>{value}</Text>
      </View>
      <Text style={{ fontSize: 20, color: '#CCC' }}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={{ padding: 16, paddingTop: 50, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onBack} style={{ marginRight: 16 }}>
          <Text style={{ color: '#666', fontSize: 16, fontWeight: '600' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>About</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          <View style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: '#E3F2FD', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 40 }}>🌐</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Learn Web Dev</Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Version 1.0 • 26 Lessons</Text>
        </View>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 20 }}>
          <Text style={{ fontSize: 15, color: '#555', lineHeight: 22, textAlign: 'center' }}>
            An interactive learning app for HTML, CSS, and JavaScript. Learn web development step by step with hands-on lessons, checkpoints, and real code examples.
          </Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12, marginLeft: 4 }}>Contact Developer</Text>
        <ContactItem icon="💬" label="WhatsApp" value="+27 63 121 1181" color="#25D366" onPress={() => openLink('https://wa.me/276312111181')} />
        <ContactItem icon="📧" label="Email" value="makhanyabanele12@gmail.com" color="#EA4335" onPress={() => openLink('mailto:makhanyabanele12@gmail.com')} />
        <ContactItem icon="👤" label="Facebook" value="Banele Makhanya" color="#1877F2" onPress={() => openLink('https://www.facebook.com/profile.php?id=61560654845040')} />
        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Text style={{ fontSize: 13, color: '#999' }}>Made with ❤️ for aspiring developers</Text>
          <Text style={{ fontSize: 12, color: '#BBB', marginTop: 4 }}>© 2026 Banele Makhanya</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ===== MAIN APP =====
export default function App() {
  const [screen, setScreen] = useState('splash');
  const [prevScreen, setPrevScreen] = useState('home');
  const [topic, setTopic] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const totalLessons = getAllLessons().length;

  useEffect(() => { 
    init();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'lesson') { setScreen('topic'); return true; }
      else if (screen === 'topic') { setScreen('home'); return true; }
      else if (screen === 'about') { setScreen('home'); return true; }
      else if (screen === 'playground') { setScreen(prevScreen); return true; }
      return false;
    });
    return () => backHandler.remove();
  }, [screen]);

  const init = async () => {
    const p = await getProgress();
    setProgress(p);
    setLoading(false);
  };

  const getCompleted = (t) => t.lessons.filter(l => progress[l.id]).length;
  const getTotalCompleted = () => Object.keys(progress).length;

  const handleComplete = async () => {
    if (lesson && !lessonCompleted) {
      await saveProgress(lesson.id);
      const p = await getProgress();
      setProgress({...p});
      setLessonCompleted(true);
    }
  };

  const nextLesson = () => {
    if (lessonIdx < topic.lessons.length - 1) {
      const next = topic.lessons[lessonIdx + 1];
      setLesson(next);
      setLessonIdx(lessonIdx + 1);
      setLessonCompleted(!!progress[next.id]);
    } else {
      setScreen('topic');
    }
  };

  const openPlayground = () => {
    setPrevScreen(screen);
    setScreen('playground');
  };

  if (screen === 'splash') {
    return <SplashScreen onFinish={() => setScreen('home')} />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 16, color: '#666' }}>Loading...</Text>
      </View>
    );
  }

  if (screen === 'playground') {
    return <PlaygroundScreen onBack={() => setScreen(prevScreen)} />;
  }

  if (screen === 'about') {
    return (
      <View style={{ flex: 1 }}>
        <AboutScreen onBack={() => setScreen('home')} />
      </View>
    );
  }

  if (screen === 'home') {
    const completed = getTotalCompleted();
    const allDone = completed === totalLessons && totalLessons > 0;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <PlaygroundButton onPress={openPlayground} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => setScreen('about')} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#E3F2FD' }}>
            <Text style={{ color: '#2196F3', fontSize: 14, fontWeight: '600' }}>About</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 4, paddingBottom: 10 }}>
          <Text style={{ fontSize: 48 }}>🌐</Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginTop: 8 }}>Learn Web Dev</Text>
          <Text style={{ fontSize: 16, color: '#666', marginTop: 4 }}>HTML → CSS → JavaScript</Text>
        </View>
        <ProgressBar current={completed} total={totalLessons} color="#4CAF50" />
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginHorizontal: 16, marginTop: 16, marginBottom: 8 }}>Choose a Topic</Text>
        {CURRICULUM.map(t => (
          <LessonCard key={t.id} topic={t} completedCount={getCompleted(t)} onPress={() => { setTopic(t); setLessonIdx(0); setScreen('topic'); }} />
        ))}
        <View style={{ padding: 20, alignItems: 'center' }}>
          {allDone ? <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: '600' }}>🎉 All complete! You are a web developer!</Text> : <Text style={{ color: '#666' }}>{totalLessons - completed} remaining</Text>}
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'topic') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
        <PlaygroundButton onPress={openPlayground} />
        <View style={{ padding: 24, paddingTop: 50, alignItems: 'center', backgroundColor: topic.color }}>
          <TouchableOpacity onPress={() => setScreen('home')} style={{ position: 'absolute', top: 16, left: 16 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 48, marginBottom: 8 }}>{topic.icon}</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{topic.title}</Text>
          <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>{topic.desc}</Text>
        </View>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          {topic.lessons.map((l, i) => {
            const done = !!progress[l.id];
            const locked = i > 0 && !progress[topic.lessons[i-1]?.id];
            return (
              <TouchableOpacity key={l.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 10, opacity: locked ? 0.5 : 1, borderLeftWidth: done ? 4 : 0, borderLeftColor: '#4CAF50', elevation: 2 }} onPress={() => !locked && (setLesson(l), setLessonIdx(i), setLessonCompleted(!!progress[l.id]), setScreen('lesson'))} disabled={locked}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: done ? '#4CAF50' : '#666' }}>{done ? '✓' : locked ? '🔒' : i+1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: locked ? '#999' : '#333' }}>{l.title}</Text>
                  <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>⏱️ {l.estimatedTime}</Text>
                </View>
                {done && <Text style={{ color: '#4CAF50', fontWeight: '600', fontSize: 13 }}>Done</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'lesson') {
    const showNext = lessonCompleted;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
        <PlaygroundButton onPress={openPlayground} />
        <View style={{ padding: 16, paddingTop: 50, backgroundColor: 'white', borderBottomWidth: 3, borderBottomColor: topic.color }}>
          <TouchableOpacity onPress={() => setScreen('topic')} style={{ position: 'absolute', top: 16, left: 16 }}>
            <Text style={{ color: '#666', fontSize: 16, fontWeight: '600' }}>← {topic.title}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 8 }}>{lesson.title}</Text>
          <Text style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Lesson {lessonIdx + 1} of {topic.lessons.length} • ⏱️ {lesson.estimatedTime}</Text>
        </View>
        <LessonViewer key={lesson.id} sections={lesson.sections} onCheckpointComplete={handleComplete} lessonCompleted={lessonCompleted} />
        {showNext && (
          <TouchableOpacity style={{ margin: 16, padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: topic.color }} onPress={nextLesson}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{lessonIdx < topic.lessons.length - 1 ? 'Next Lesson →' : '← Back to Topics'}</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
});
 
