// src/screens/ExpensesScreen.js - Complete Version
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  chartreuse: '#bcaa01',
  orange: '#ef7102',
  plum: '#782946',
  oliveGreen: '#777c3e',
  magenta: '#ba005f',
  background: '#FFF8DC',
  text: '#2F4F4F',
};

const ExpensesScreen = () => {
  const [activeTab, setActiveTab] = useState('expenses');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addExpenseModalVisible, setAddExpenseModalVisible] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    category: 'Food',
  });

  const groupMembers = ['Kika', 'Kailey', 'Mia', 'Kenzie', 'Beatrice', 'Sam', 'Zoey', 'Liz', 'Hayley', 'JD', 'Mel', 'Alyssa', 'Ellen', 'Mackenzie', 'Rylee', 'Sydney'];

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'La Dea Santa Fe (4 nights)',
      amount: 5789.00,
      paidBy: 'Sarah',
      category: 'Accommodation',
      date: '2025-01-16',
      splitBetween: groupMembers,
    },
    {
      id: 2,
      description: 'Ten Thousand Waves Hot Springs',
      amount: 210.00, // $35 x 6 people
      paidBy: 'Emma',
      category: 'Activities',
      date: '2025-01-19',
      splitBetween: groupMembers,
    },
    {
      id: 3,
      description: 'Meow Wolf Tickets',
      amount: 180.00, // $30 x 6 people
      paidBy: 'Kate',
      category: 'Activities',
      date: '2025-01-19',
      splitBetween: groupMembers,
    },
    {
      id: 4,
      description: 'Groceries & House Supplies',
      amount: 240.00,
      paidBy: 'Jess',
      category: 'Food',
      date: '2025-01-16',
      splitBetween: groupMembers,
    },
  ]);

  const [tickets] = useState([
    {
      id: 1,
      title: 'Ten Thousand Waves',
      type: 'Hot Springs Pass',
      date: 'January 19, 2025',
      time: '11:00 AM',
      price: '$35.00 per person',
      status: 'confirmed',
      qrCode: 'TTW_012025_DESERT_DISCO',
      details: 'Day pass includes access to communal hot tubs, cold plunge, and relaxation areas',
      location: '451 Hyde Park Rd, Santa Fe, NM 87501',
      notes: 'Bring swimwear and flip flops. Towels provided.',
    },
    {
      id: 2,
      title: 'Meow Wolf Santa Fe',
      type: 'Immersive Art Experience',
      date: 'January 19, 2025',
      time: '6:00 PM',
      price: '$30.00 per person',
      status: 'confirmed',
      qrCode: 'MW_SF_012025_BACHELORETTE',
      details: 'House of Eternal Return - Interactive art installation experience',
      location: '1352 Rufina Cir, Santa Fe, NM 87507',
      notes: 'Allow 2-3 hours to fully experience. Comfortable shoes recommended.',
    }
  ]);

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const expense = {
      id: expenses.length + 1,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      paidBy: newExpense.paidBy,
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0],
      splitBetween: groupMembers,
    };

    setExpenses([...expenses, expense]);
    setNewExpense({ description: '', amount: '', paidBy: '', category: 'Food' });
    setAddExpenseModalVisible(false);
    Alert.alert('Success', 'Expense added successfully!');
  };

  const calculateTotals = () => {
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const perPersonTotal = totalSpent / groupMembers.length;
    
    const memberTotals = {};
    groupMembers.forEach(member => {
      memberTotals[member] = {
        paid: expenses.filter(e => e.paidBy === member).reduce((sum, e) => sum + e.amount, 0),
        owes: perPersonTotal
      };
    });

    return { totalSpent, perPersonTotal, memberTotals };
  };

  const openTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return colors.chartreuse;
      case 'pending':
        return colors.orange;
      default:
        return colors.plum;
    }
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      Food: colors.orange,
      Activities: colors.magenta,
      Accommodation: colors.plum,
      Transportation: colors.chartreuse,
      Other: colors.oliveGreen,
    };
    return categoryColors[category] || colors.text;
  };

  const { totalSpent, perPersonTotal } = calculateTotals();

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'expenses' && styles.activeTab]}
          onPress={() => setActiveTab('expenses')}
        >
          <Text style={[styles.tabText, activeTab === 'expenses' && styles.activeTabText]}>
            💰 Expenses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tickets' && styles.activeTab]}
          onPress={() => setActiveTab('tickets')}
        >
          <Text style={[styles.tabText, activeTab === 'tickets' && styles.activeTabText]}>
            🎫 Tickets
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {activeTab === 'expenses' ? (
          // Expenses View
          <View>
            {/* Summary Header */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>🏜️ Desert Disco Expenses</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Spent:</Text>
                <Text style={styles.summaryAmount}>${totalSpent.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Per Person:</Text>
                <Text style={styles.summaryAmount}>${perPersonTotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Group Size:</Text>
                <Text style={styles.summaryAmount}>{groupMembers.length} people</Text>
              </View>
            </View>

            {/* Add Expense Button */}
            <View style={styles.addExpenseSection}>
              <TouchableOpacity
                style={styles.addExpenseButton}
                onPress={() => setAddExpenseModalVisible(true)}
              >
                <Icon name="add-circle" size={24} color="white" />
                <Text style={styles.addExpenseButtonText}>Add New Expense</Text>
              </TouchableOpacity>
            </View>

            {/* Expenses List */}
            <View style={styles.expensesContainer}>
              <Text style={styles.sectionTitle}>📊 All Expenses</Text>
              {expenses.map(expense => (
                <View key={expense.id} style={styles.expenseCard}>
                  <View style={styles.expenseHeader}>
                    <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(expense.category) }]}>
                      <Text style={styles.categoryText}>{expense.category}</Text>
                    </View>
                    <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
                  </View>
                  
                  <Text style={styles.expenseDescription}>{expense.description}</Text>
                  
                  <View style={styles.expenseFooter}>
                    <Text style={styles.paidByText}>Paid by {expense.paidBy}</Text>
                    <Text style={styles.dateText}>{expense.date}</Text>
                  </View>
                  
                  <Text style={styles.splitText}>
                    Split between {expense.splitBetween.length} people (${(expense.amount / expense.splitBetween.length).toFixed(2)} each)
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          // Tickets View
          <View>
            <View style={styles.ticketsHeader}>
              <Text style={styles.ticketsTitle}>🎫 Our Activity Tickets</Text>
              <Text style={styles.ticketsSubtitle}>
                {tickets.filter(t => t.status === 'confirmed').length} of {tickets.length} confirmed
              </Text>
            </View>

            {tickets.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                style={[styles.ticketCard, { borderLeftColor: getStatusColor(ticket.status) }]}
                onPress={() => openTicketModal(ticket)}
              >
                <View style={styles.ticketHeader}>
                  <View style={styles.ticketTypeContainer}>
                    <Text style={styles.ticketType}>{ticket.type}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
                      <Icon 
                        name="check-circle" 
                        size={12} 
                        color="white" 
                      />
                      <Text style={styles.statusText}>
                        {ticket.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                
                <View style={styles.ticketDetails}>
                  <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateText}>📅 {ticket.date}</Text>
                    <Text style={styles.timeText}>⏰ {ticket.time}</Text>
                  </View>
                  <Text style={styles.priceText}>{ticket.price}</Text>
                </View>

                <Text style={styles.locationText}>📍 {ticket.location}</Text>

                <View style={styles.ticketFooter}>
                  <Text style={styles.tapToView}>Tap to view details & QR code</Text>
                  <Icon name="qr-code" size={24} color={colors.magenta} />
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.ticketNote}>
              <Icon name="info" size={20} color={colors.orange} />
              <Text style={styles.ticketNoteText}>
                Save these tickets to your phone's wallet for easy access during the trip!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Add Expense Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addExpenseModalVisible}
        onRequestClose={() => setAddExpenseModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addExpenseModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Expense</Text>
              <TouchableOpacity
                onPress={() => setAddExpenseModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.inputLabel}>What did you pay for?</Text>
              <TextInput
                style={styles.textInput}
                value={newExpense.description}
                onChangeText={(text) => setNewExpense({...newExpense, description: text})}
                placeholder="e.g., Dinner at restaurant, Uber ride, etc."
                placeholderTextColor={colors.oliveGreen}
              />

              <Text style={styles.inputLabel}>Amount ($)</Text>
              <TextInput
                style={styles.textInput}
                value={newExpense.amount}
                onChangeText={(text) => setNewExpense({...newExpense, amount: text})}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor={colors.oliveGreen}
              />

              <Text style={styles.inputLabel}>Who paid?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.memberSelector}>
                {groupMembers.map(member => (
                  <TouchableOpacity
                    key={member}
                    style={[
                      styles.memberButton,
                      newExpense.paidBy === member && styles.selectedMember
                    ]}
                    onPress={() => setNewExpense({...newExpense, paidBy: member})}
                  >
                    <Text style={[
                      styles.memberButtonText,
                      newExpense.paidBy === member && styles.selectedMemberText
                    ]}>
                      {member}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categorySelector}>
                {['Food', 'Activities', 'Transportation', 'Accommodation', 'Other'].map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      { backgroundColor: newExpense.category === category ? getCategoryColor(category) : '#f0f0f0' }
                    ]}
                    onPress={() => setNewExpense({...newExpense, category})}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      { color: newExpense.category === category ? 'white' : colors.text }
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.submitExpenseButton} onPress={addExpense}>
                <Text style={styles.submitExpenseButtonText}>Add Expense</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Ticket Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTicket && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedTicket.title}</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Icon name="close" size={24} color={colors.text} />
                  </TouchableOpacity>
                </View>

                <View style={styles.qrCodeContainer}>
                  <View style={styles.qrCodePlaceholder}>
                    <Icon name="qr-code" size={80} color={colors.magenta} />
                    <Text style={styles.qrCodeText}>QR Code</Text>
                    <Text style={styles.qrCodeId}>{selectedTicket.qrCode}</Text>
                  </View>
                </View>

                <ScrollView style={styles.ticketInfo}>
                  <Text style={styles.infoTitle}>🎫 Ticket Details:</Text>
                  <Text style={styles.infoText}>{selectedTicket.details}</Text>
                  
                  <Text style={styles.infoTitle}>📅 Date & Time:</Text>
                  <Text style={styles.infoText}>{selectedTicket.date} at {selectedTicket.time}</Text>
                  
                  <Text style={styles.infoTitle}>📍 Location:</Text>
                  <Text style={styles.infoText}>{selectedTicket.location}</Text>
                  
                  <Text style={styles.infoTitle}>💰 Price:</Text>
                  <Text style={styles.infoText}>{selectedTicket.price}</Text>

                  <Text style={styles.infoTitle}>📝 Important Notes:</Text>
                  <Text style={styles.infoText}>{selectedTicket.notes}</Text>
                </ScrollView>

                <TouchableOpacity 
                  style={styles.saveToWalletButton}
                  onPress={() => {
                    Alert.alert('Save to Wallet', 'Feature coming soon! For now, screenshot this QR code.');
                  }}
                >
                  <Icon name="account-balance-wallet" size={20} color="white" />
                  <Text style={styles.saveToWalletText}>Save to Apple Wallet</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.magenta,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.oliveGreen,
  },
  activeTabText: {
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: colors.magenta,
    padding: 20,
    margin: 15,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
    color: 'white',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  balancesContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  memberBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  balanceDetails: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 12,
    color: colors.oliveGreen,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expensesContainer: {
    margin: 15,
  },
  expenseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  expenseDescription: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  expenseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  paidByText: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  dateText: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  splitText: {
    fontSize: 12,
    color: colors.plum,
    fontStyle: 'italic',
  },
  addExpenseSection: {
    margin: 15,
  },
  addExpenseButton: {
    backgroundColor: colors.chartreuse,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addExpenseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  addExpenseModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  formContainer: {
    padding: 20,
    maxHeight: 400,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.chartreuse,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  memberSelector: {
    marginBottom: 10,
  },
  memberButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedMember: {
    backgroundColor: colors.magenta,
  },
  memberButtonText: {
    color: colors.text,
    fontWeight: '500',
    fontSize: 12,
  },
  selectedMemberText: {
    color: 'white',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontWeight: '500',
  },
  submitExpenseButton: {
    backgroundColor: colors.magenta,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitExpenseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  ticketsHeader: {
    backgroundColor: colors.magenta,
    padding: 20,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  ticketsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  ticketsSubtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  ticketCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 6,
  },
  ticketHeader: {
    marginBottom: 10,
  },
  ticketTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketType: {
    fontSize: 12,
    color: colors.oliveGreen,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  ticketDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTimeContainer: {
    flex: 1,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.orange,
  },
  timeText: {
    fontSize: 14,
    color: colors.text,
  },
  locationText: {
    fontSize: 14,
    color: colors.oliveGreen,
    marginBottom: 10,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tapToView: {
    fontSize: 12,
    color: colors.magenta,
    fontStyle: 'italic',
  },
  ticketNote: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  ticketNoteText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCodePlaceholder: {
    backgroundColor: colors.background,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.chartreuse,
  },
  qrCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
  },
  qrCodeId: {
    fontSize: 12,
    color: colors.oliveGreen,
    marginTop: 5,
    fontFamily: 'monospace',
  },
  ticketInfo: {
    maxHeight: 200,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: colors.oliveGreen,
    marginBottom: 8,
    lineHeight: 18,
  },
  saveToWalletButton: {
    backgroundColor: colors.chartreuse,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  saveToWalletText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ExpensesScreen;
